const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireFesAuth = require('../middlewares/requireFesAuth');
const requireTokens = require('../middlewares/requireTokens');

//이더리움네트워크에서 토큰 전송하는 함수
const tokenTransfer = require('../ethereum/tokenTransfer');
const { accounts } = require('../ethereum/accounts');
const defaultAccount = accounts[0];
var cron = require('node-cron');
const {
	postingFee,
	challengeFee,
	challengeReward,
	votingReward,
	postingReward
} = require('../config/params');
const User = mongoose.model('users');
const Snippet = mongoose.model('snippets');

module.exports = app => {
	app.get('/api/snippets', requireLogin, async (req, res) => {
		const snippets = await Snippet.find({ isChallenged: false });
		res.send(snippets);
	});

	app.get('/api/snippets/isChallenged', requireLogin, async (req, res) => {
		const snippets = await Snippet.find({ isChallenged: true, trash: false });
		res.send(snippets);
	});

	app.get('/api/snippets/trash', requireLogin, async (req, res) => {
		const snippets = await Snippet.find({ trash: true });
		res.send(snippets);
	});

	//글 등록
	app.post(
		'/api/snippets',
		requireLogin,
		requireFesAuth,
		requireTokens,
		async (req, res) => {
			const { subject, title, body } = req.body;

			const snippet = new Snippet({
				subject,
				title,
				body,
				datePosted: Date.now(),
				_creator: req.user.id
			});

			try {
				await snippet.save();
				req.user.token -= postingFee;
				tokenTransfer(
					req.user.address,
					defaultAccount.address,
					req.user.privateKey,
					postingFee
				);
				const user = await req.user.save();
				res.send(user);
			} catch (err) {
				res.send(422).send(err);
			}
		}
	);

	//글에 challenge 걸기
	app.post(
		'/api/snippets/challenge',
		requireLogin,
		requireFesAuth,
		requireTokens,
		async (req, res) => {
			const { snippetId, reasonChallenged } = req.body;
			const challengedSnippet = await Snippet.findById(snippetId);
			challengedSnippet.set({
				isChallenged: true,
				reasonChallenged: reasonChallenged,
				lastChallenged: Date.now(),
				_challenger: req.user.id
			});

			try {
				await challengedSnippet.save();
				req.user.token -= challengeFee;
				tokenTransfer(
					req.user.address,
					defaultAccount.address,
					req.user.privateKey,
					challengeFee
				);
				const user = await req.user.save();
				res.send(user);
			} catch (err) {
				res.send(422).send(err);
			}
		}
	);

	//글에 VOTE하기
	app.post(
		'/api/snippets/vote',
		requireLogin,
		requireFesAuth,
		async (req, res) => {
			const { snippetId, yes, no } = req.body;

			const challengedSnippet = await Snippet.findById(snippetId);

			if (
				(await challengedSnippet.yesVoters.find(e => {
					return e == req.user.id;
				})) ||
				(await challengedSnippet.noVoters.find(e => {
					return e == req.user.id;
				}))
			) {
				return res.send('이미 투표하셨습니다');
			}

			if (yes) {
				challengedSnippet.yes++;
				challengedSnippet.yesVoters.push(req.user.id);
			}
			if (no) {
				challengedSnippet.no++;
				challengedSnippet.noVoters.push(req.user.id);
			}
			console.log(challengedSnippet);
			try {
				await challengedSnippet.save();
				res.send('투표가 완료되었습니다');
			} catch (err) {
				res.send(422).send(err);
			}
		}
	);

	//매분마다 투표시간 마감된 글이 있나 확인
	cron.schedule('* * * * *', async () => {
		const snippets = await Snippet.find({ isChallenged: true, trash: false });
		console.log('투표마감글확인중..');
		_.forEach(snippets, async snippet => {
			var challengedTime = new Date(snippet.lastChallenged);
			var currentTime = new Date();
			var remainingTime =
				300 -
				Math.floor(
					(currentTime.getTime() - challengedTime.getTime()) / (1000 * 60)
				);
			//시간 끝나서 퇴출 찬성결과시 challenge 제작자 및 찬성 보터들에게 보상하고 쓰레기처리
			if (remainingTime <= 0 && snippet.yes >= snippet.no) {
				const creator = await User.findById(snippet._creator);
				creator.token += challengeReward;
				tokenTransfer(
					defaultAccount.address,
					creator.address,
					defaultAccount.privateKey,
					challengeReward
				);
				await creator.save();
				_.forEach(snippet.yesVoters, async voterId => {
					const voter = await User.findById(voterId);
					voter.token += votingReward;
					tokenTransfer(
						defaultAccount.address,
						voter.address,
						defaultAccount.privateKey,
						votingReward
					);
					voter.save();
				});
				snippet.set({
					trash: true
				});
				snippet.save();
				console.log('투표처리완료');
			}
			//퇴출 반대결과시 반대 보터들에게 보상하고 다시 복귀시킴
			if (remainingTime <= 0 && snippet.yes < snippet.no) {
				_.forEach(snippet.noVoters, async voterId => {
					const voter = await User.findById(voterId);
					voter.token += votingReward;
					tokenTransfer(
						defaultAccount.address,
						voter.address,
						defaultAccount.privateKey,
						votingReward
					);
					voter.save();
				});
				snippet.set({
					isChallenged: false,
					reasonChallenged: null,
					_challenger: null,
					yes: 0,
					yesVoters: [],
					no: 0,
					noVoters: []
				});
				snippet.save();
				console.log('투표처리완료');
			}
		});
	});

	//매 시마다 게시글을 올린 유저들에게 코인을 공급
	cron.schedule('0 1-23 * * *', async () => {
		const snippets = await Snippet.find({ isChallenged: false });
		_.forEach(snippets, async snippet => {
			const snippetCreator = await User.findById(snippet._creator);
			snippetCreator.token += postingReward;
			tokenTransfer(
				defaultAccount.address,
				snippetCreator.address,
				defaultAccount.privateKey,
				postingReward
			);
			snippetCreator.save();
		});
		console.log('코인공급완료');
	});
};
