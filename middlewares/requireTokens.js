module.exports = (req, res, next) => {
	if (req.user.token < 1) {
		return res.status(403).send({ error: 'FES토큰이 없습니다!' });
	}
	next();
};
