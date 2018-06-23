const web3 = require('./web3');
let HDWalletAccounts = require('hdwallet-accounts');
let walletAccounts = HDWalletAccounts(100, web3.currentProvider.mnemonic);
module.exports = walletAccounts;
