const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); //loading mongoose model class

passport.serializeUser((user, done) => {
	console.log('user.id:', user.id);
	done(null, user.id); //몽고가 자동으로assign해준 id
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		console.log('user:', user);
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true //구글oauth는 기본적으로 proxy를 통하면 https로 redirect하지 않기때문에 켜준다 (heroku proxy를 신뢰하기때,)
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				done(null, existingUser);
			} else {
				user = await new User({ googleId: profile.id }).save();
				done(null, user);
			}
		}
	)
);
