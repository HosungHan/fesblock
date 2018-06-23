const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const keys = require('../config/keys');
const provider = new HDWalletProvider(
	keys.mnemonic,
	'https://rinkeby.infura.io/rb9yXTnymdc6MXQkSraq'
);

module.exports = new Web3(provider);
