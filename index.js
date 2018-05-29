const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
//아무것도 반환하지 않기때문에 실행만
require('./models/User'); //순서 중요함. 먼저 User에서 Model Class를 먼저 실행
require('./services/passport'); //그 후 User Instance 저장

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, //단위밀리세컨드 즉 30일
		keys: [keys.cookieKey] //여러개가 들어가면 랜덤선택
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
