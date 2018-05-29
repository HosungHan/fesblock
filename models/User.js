const mongoose = require('mongoose');
const { initialToken } = require('../config/params');
const { Schema } = mongoose; //equal to const Schema = mongoose.Schema

const userSchema = new Schema({
	googleId: String,
	token: { type: Number, default: initialToken }
});

//create new collection, if it doesn't exist
mongoose.model('users', userSchema);

//몽구스는 export를 안하고 아니라 다른 방식으로 로딩함. 테스트상황시 중복실행되어 에러뜰수있기때문
