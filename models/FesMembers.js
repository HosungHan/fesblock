const mongoose = require('mongoose');
const fs = require('fs');
const { Schema } = mongoose; //equal to const Schema = mongoose.Schema
const keys = require('../config/keys');
mongoose.connect(keys.mongoURI);

const fesMembersSchema = new Schema({
	group: String,
	name: String,
	pic: String,
	email: String
});

const FesMembers = mongoose.model('fesmembers', fesMembersSchema);

// fes멤버정보는 처음 한번만 디비에 저장하면된다. 혹시 새로 올릴 필요가 있다면 아래 코드를 이용하자
// if ('../config/fesMembersArray.txt') {
// 	const data = fs.readFileSync('../config/fesMembersArray.txt', 'utf-8');
// 	const arr = data.split(',,');
// 	const newArr = new Array();
// 	for (i = 0; i < arr.length; i++) {
// 		newArr[i] = JSON.parse(arr[i]);
// 		const { group, name, pic, email } = newArr[i];
// 		new FesMembers({ group, name, pic, email }).save();
// 	}
// 	return console.log('writing successful');
// }
