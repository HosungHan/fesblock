const web3 = require('./web3');
const abi = require('./tokenabi.json');
const keys = require('../config/keys');
//이미 remix에서 deployed된 컨트렉트를 불러온다
module.exports = new web3.eth.Contract(abi, keys.contractAddress);
