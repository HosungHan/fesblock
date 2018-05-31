module.exports = (req, res, next) => {
	if (req.user.certification === false) {
		return res.status(403).send({ error: 'FES회원 인증을 해주세요' });
	}
	next();
};
