const keys = require('../../config/keys');

module.exports = id => {
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>FES코인 멤버인증</h3>
					<p>아래의 링크를 클릭하시면 멤버인증이 완료됩니다</p>
					<div><a href="${keys.redirectDomain}/api/user/${id}">인증</a></div>
				</div>
			</body>
		</html>
	`;
};
