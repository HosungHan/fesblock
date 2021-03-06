// prod.js - production keys here!!
module.exports = {
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	mongoURI: process.env.MONGO_URI,
	cookieKey: process.env.COOKIE_KEY,
	sendgridKey: process.env.SENDGRID_KEY,
	redirectDomain: process.env.REDIRECT_DOMAIN,
	contractAddress: process.env.CONTRACT_ADDRESS,
	mnemonic: process.env.MNEMONIC
};
