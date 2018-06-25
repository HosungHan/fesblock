import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Parallax } from 'react-materialize';
import { Link } from 'react-router-dom';

class Landing extends Component {
	render() {
		return (
			<div>
				<div
					id="index-banner"
					className="parallax-container"
					style={{ height: '750px' }}
				>
					<div className="container">
						<h1 className="header center blue-grey-text text-lighten-4">
							FES Block
						</h1>
						<div className="row center">
							<h5 className="header white-text flow-text">
								토큰 이코노미 기반 FES익명 게시판
							</h5>
							<h5 className="white-text">*이용방법</h5>
							<div className="left-align white-text container">
								<p>1.별도의 가입절차 없이 구글 계정으로 로그인</p>
								<p>
									2.FES회원 인증을 클릭, 기수와 이름을 입력하면 홈페이지에
									등록되어있는 메일주소를 통해 본인 인증 (스팸함 꼭
									확인해주세요)
								</p>
								<p>
									4.인증 후 토큰이 지급되면 자유주제(익명)로 아무런 글이나 올릴
									수 있습니다
								</p>
								<p>
									5.글을 올리는데 약간의 토큰이 소모되며, 글이 목록에 올라가
									있는 동안 매 시간마다 토큰이 보상으로 들어옵니다
								</p>
								<p>
									6.글이 유익하지 않고 재미조차 없다고 판단 시 약간의 토큰을
									지불하여 퇴출 신청을 할 수 있습니다. 퇴출 성공시에도 토큰을
									보상받습니다
								</p>
								<p>
									7.퇴출 신청 당한 글은 300분동안 유저 투표가 진행됩니다. 찬성
									및 반대 투표를 할 수 있으며 투표에는 코인이 소모되지 않고,
									내가 투표한 쪽이 과반수를 넘을 시 토큰을 보상받습니다
								</p>
								<p>
									8.보상 및 토큰 시스템에 대한 자세한 정보는{' '}
									<Link to="/details">여기</Link>를 참고해주세요
								</p>
							</div>
						</div>
						<div className="row center">
							<a
								href={this.props.auth ? '/board' : '/auth/google'}
								className="btn-large waves-effect waves-light grey darken-4"
							>
								시작하기
							</a>
						</div>
						<br />
						<br />
					</div>

					<div className="parallax">
						<img
							src="https://www.coinannouncer.com/wp-content/uploads/2018/02/Pic.jpg"
							alt="배경사진"
						/>
					</div>
				</div>

				<div className="section white">
					<div className="row container">
						<h4 className="header">토큰 이코노미란?</h4>
						<p className="grey-text text-darken-3 lighten-3">
							토큰 이코노미란 생태계에 참여하는 모든 이해관계자가 기여한만큼
							상응하는 보상을 받는 시스템입니다. 예를 들어 Facebook은 Facebook의
							발전에 공헌한 절대다수(유저)보다 Facebook 플랫폼을 만든 회사가
							모든 이익을 독점합니다. 반대로 제가 자주 보는 Steemit은 글을
							쓰거나 공유를하거나 좋아요를 누르는 참여자들에게 보상을 나눠주죠.
							이 웹애플리케이션의 경우는 토큰 이코노미 모델 중 하나인 TCR (Token
							Curated Registry) 모델에 기반하여 간단히 만들어 보았습니다. 적절한
							보상의 설계를 통해 생태계에 참여하는 모든 유저들, (여기서는 글을
							읽는 사람, 글을 쓰는 사람, 그리고 토큰을 보유한 사람들)이 모두
							생태계 발전에 기여할 수 있도록 만드는 것이죠. TCR에대해 더
							궁금하신 분은 이 글을 참고해주세요.
							<a href="https://medium.com/@ilovebagels/token-curated-registries-1-0-61a232f8dac7">
								클릭!
							</a>
						</p>
						<p>
							문의사항, 건의사항, 문과생이 갑자기 개발을 어떻게 배웠는지
							궁금하다 등등 자유롭게 질문해주세요 rtigerhan@gmail.com
						</p>
					</div>
				</div>
				<Parallax />
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Landing);
