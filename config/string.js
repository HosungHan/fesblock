var fs = require('fs');

var data = fs.readFileSync('file6', 'utf-8');
var arr = data.split(',');
var objectified = [];

function objectify(arr) {
	for (var i = 0; i < arr.length; i = i + 4) {
		var object = {
			pic: arr[i],
			group: arr[i + 1],
			name: arr[i + 2],
			email: arr[i + 3]
		};

		objectified.push(object);
	}
}
objectify(arr);
var final = JSON.stringify(objectified);
fs.writeFile('objectfile01.txt', final, 'utf-8', function(e) {
	if (e) {
		// 3. 파일생성 중 오류가 발생하면 오류출력
		console.log(e);
	} else {
		// 4. 파일생성 중 오류가 없으면 완료 문자열 출력
		console.log('01 WRITE DONE!');
	}
});

//fs.writeFileSync('file4', newStr, 'utf-8');

//
// const fesMembers = require('./fesmembers');
//
// var membersObject = fs.readFileSync('file01_async.txt', 'utf-8');
// var membersObject2 = membersObject.replace(/"/gi, ',');
// var arr = membersObject2.split(',');
//
// function squeakyClean(arr) {
// 	for (var i = 0; i < arr.length; i++) {
// 		if (arr[i] == null || arr[i] == '') {
// 			arr.splice(i, 1);
// 		}
// 	}
// 	return arr;
// }
// squeakyClean(arr);
//
// var membersObject = fs.writeFileSync('file2', arr, 'utf-8');
//
// function objectify(arr) {
// 	for (var i = 0; i < arr.length; i = i + 3) {
// 		var object = {};
// 	}
// }
//
// console.log(arr);
// fs.writeFile('file01_async.txt', membersObject, 'utf-8', function(e) {
// 	if (e) {
// 		// 3. 파일생성 중 오류가 발생하면 오류출력
// 		console.log(e);
// 	} else {
// 		// 4. 파일생성 중 오류가 없으면 완료 문자열 출력
// 		console.log('01 WRITE DONE!');
// 	}
