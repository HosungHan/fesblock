//회원가입, 메일을 통한 fes회원 인증을 다룸
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const FesMembers = mongoose.model('fesmembers');
const Mailer = require('../services/Mailer');
const fesAuthTemplate = require('../services/emailTemplates/fesAuthTemplate');
const { initialToken } = require('../config/params');
const requireLogin = require('../middlewares/requireLogin');
const myToken = require('../ethereum/myToken');
const web3 = require('../ethereum/web3');
const { accounts } = require('../ethereum/accounts');
const keys = require('../config/keys');

module.exports = app => {
	//구글인증
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);
	//구글 인증완료후 콜백주소 및	redirect
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/board');
		}
	);

	//로그아웃
	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	//현재유저확인
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});

	//컨트렉트주소 확인
	app.get('/api/contract_address', (req, res) => {
		res.send(keys.contractAddress);
	});

	//모든 인증완료 유저 목록
	app.get('/api/all_users', async (req, res) => {
		const allUsers = await User.find({ token: { $gte: 10 } });
		res.send(allUsers);
	});

	//FES멤버 기수, 이름, 메일주소, 사진 받아오는 라우트
	app.get('/api/fesmembers', (req, res) => {
		FesMembers.find({}, '-_id', function(err, users) {
			var userMap = [];

			users.forEach(function(user) {
				userMap.push(user);
			});

			res.send(userMap);
		});
	});

	//FES유저 인증메일 보내는 라우트
	app.post('/api/fesauth', requireLogin, async (req, res) => {
		const { email } = req.body;
		const { id } = await FesMembers.findOne({ email });

		const authMail = {
			subject: 'FES 멤버 인증메일',
			recipients: email
		};

		const mailer = new Mailer(authMail, fesAuthTemplate(id));
		try {
			await mailer.send();
			res.send(user);
		} catch (err) {
			res.status(422);
		}
	});

	//메일링크 클릭시 멤버 인증
	//메일링크 클릭시 이미 로그인이 되어있다는 가정하에 인증 진행
	app.get('/api/user/:userId', requireLogin, async (req, res) => {
		const { group, name, pic } = await FesMembers.findById(req.params.userId);
		console.log(req.user.id);
		await User.findById(req.user.id, async function(err, user) {
			if (user.certification === true)
				return res.send('이미 등록된 유저입니다');

			const index = await User.count();
			//유저 기수, 이름, 사진, 인증완료, 및 기본토큰수 셋팅
			console.log('1-------------');
			console.log(index);
			user.set({
				group,
				name,
				pic,
				certification: true,
				token: initialToken,
				address: accounts[index].address,
				privateKey: accounts[index].privateKey
			});
			console.log(accounts[index]);
			user.save();
			await myToken.methods
				.transfer(
					accounts[index].address,
					web3.utils.toWei(initialToken.toString(), 'ether')
				)
				.send({
					gas: '3000000',
					from: accounts[0].address
				});
			await web3.eth.sendTransaction({
				from: accounts[0].address,
				to: accounts[index].address,
				value: web3.utils.toWei('0.01', 'ether')
			});
		});

		res.redirect('/');
	});
};
