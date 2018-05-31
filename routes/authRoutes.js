const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const FesMembers = mongoose.model('fesmembers');
const Mailer = require('../services/Mailer');
const fesAuthTemplate = require('../services/emailTemplates/fesAuthTemplate');
const { initialToken } = require('../config/params');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.get('/', (req, res) => {
		res.send(
			`<html>
				<div>
					<form action="/api/fesauth" method="post">
						<p>이름
							<input type="text" name="name" />
						</p>
						<p>기수
							<input type="text" name="group" />
						</p>
						<input type="submit"/>
					</form>
				</div>
			</html>`
		);
	});

	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});

	//FES유저 인증메일 보내는 라우트
	app.post('/api/fesauth', requireLogin, async (req, res) => {
		const { group, name } = req.body;

		const { email, id } = await FesMembers.findOne({ group, name });

		console.log(email);
		const authMail = {
			subject: '인증메일',
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
	app.get('/api/user/:userId', requireLogin, async (req, res) => {
		const { group, name, pic } = await FesMembers.findById(req.params.userId);
		console.log(req.user.id);

		await User.findById(req.user.id, function(err, user) {
			if (user.certification === true)
				return console.log('이미 등록된 유저입니다');

			user.set({
				group,
				name,
				pic,
				certification: true,
				token: initialToken
			});
			user.save();
		});
		res.send('userId:' + req.params.userId);
	});
};
