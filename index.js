const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
//아무것도 반환하지 않기때문에 실행만
require('./models/User'); //순서 중요함. 먼저 User에서 Model Class를 먼저 실행
require('./models/FesMembers');
require('./models/Snippet');
require('./services/passport'); //그 후 User Instance 저장

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, //단위밀리세컨드 즉 30일
		keys: [keys.cookieKey] //여러개가 들어가면 랜덤선택
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/snippetRoutes')(app);

if (process.env.NODE_ENV === 'production') {
	//Express will serve up production assets
	//like our main.js file, or main.css file!
	app.use(express.static('client/build'));

	//Express will serve up index.html file
	//if it doesn't recognize the route.
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
//production일때와 개발환경일때 구분
const PORT = process.env.PORT || 5000;
app.listen(PORT);
