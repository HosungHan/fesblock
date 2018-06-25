import React from 'react';
import params from './params';
import { Link } from 'react-router-dom';
export default () => {
	return (
		<div>
			<div className="row container">
				<h4 className="header">토큰 및 보상 시스템</h4>
				<p>
					현재 구현해놓은 FES 토큰은 ERC20 규약에 따라 이더리움 네트워크 위에서
					구현했습니다. 다만 실제 이더리움 네트워크에서 토큰을 전송하는데에는
					약간의 제약사항 (가스비, 메타마스크 설치 등등)이 존재하기 때문에
					이더리움 테스트넷인 링크비를 사용하고 주소와 개인키를 제가 관리하는
					사실상 전혀 탈 중앙화 되지 않은 앱입니다.
				</p>
				<blockquote>최초 코인 지급량: {params.initialToken}개</blockquote>
				<blockquote>게시물 등록 소모 코인: {params.postingFee}개</blockquote>
				<blockquote>퇴출 신청 소모 코인: {params.challengeFee}개</blockquote>
				<blockquote>
					퇴출 성공시 보상 코인: {params.challengeReward}개
				</blockquote>
				<blockquote>투표 성공시 보상 코인: {params.votingReward}개</blockquote>
				<blockquote>
					게시물 1건당 1시간 코인 지급량: {params.postingReward}개
				</blockquote>
				<blockquote>FES Coin 콘트랙트 주소: 본인 토큰 수를 클릭!</blockquote>
				<p>
					문의사항, 건의사항, 기타 잡다한 질문들은 다음의 주소로
					부탁드리겠습니다 rtigerhan@gmail.com
				</p>
				<Link to="/" className="grey darken-4 btn-flat white-text">
					뒤로가기
				</Link>
			</div>
		</div>
	);
};
