const myToken = require('./myToken');
const web3 = require('./web3');

module.exports = async (addressFrom, addressTo, privateKey, value) => {
	try {
		await web3.eth.accounts.wallet.add(privateKey);
		await myToken.methods
			.transfer(addressTo, web3.utils.toWei(value.toString(), 'ether'))
			.send({
				gas: '3000000',
				from: addressFrom
			});
	} catch (err) {
		return err;
	}
};
