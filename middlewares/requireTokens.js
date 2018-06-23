const { postingFee } = require('../config/params');

module.exports = (req, res, next) => {
	if (req.user.token < postingFee) {
		return res.status(403).send({ error: 'FES토큰이 부족합니다' });
	}
	next();
};
