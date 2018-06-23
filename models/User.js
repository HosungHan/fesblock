//몽구스 유저모델
const mongoose = require('mongoose');
const { Schema } = mongoose; //equal to const Schema = mongoose.Schema

const userSchema = new Schema({
	googleId: String,
	token: { type: Number, default: 0 },
	group: String,
	name: String,
	pic: String,
	certification: { type: Boolean, default: false },
	address: String,
	privateKey: String
});

//create new collection, if it doesn't exist
mongoose.model('users', userSchema);

//몽구스는 export를 안하고 아니라 다른 방식으로 로딩함. 테스트상황시 중복실행되어 에러뜰수있기때문
