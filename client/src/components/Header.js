import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavItem } from 'react-materialize';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<div>
						<NavItem href="/ranking">랭킹</NavItem>
						<NavItem href="/auth/google">간편 로그인</NavItem>
					</div>
				);
			default:
				if (this.props.auth.certification === false) {
					return (
						<div>
							<NavItem href="/fesauth">FES회원인증</NavItem>
							<NavItem href="/ranking">랭킹</NavItem>
							<NavItem href="/api/logout">로그아웃</NavItem>
						</div>
					);
				}
				return (
					<div>
						<NavItem href="/board">게시판</NavItem>
						<NavItem href="/board/challenged">투표하기</NavItem>
						<NavItem
							href={
								'https://rinkeby.etherscan.io/token/' +
								this.props.contract +
								'?a=' +
								this.props.auth.address
							}
						>
							FES토큰: {this.props.auth.token}개
						</NavItem>
						<NavItem href="/ranking">랭킹</NavItem>
						<NavItem href="/api/logout">로그아웃</NavItem>
					</div>
				);
		}
	}

	render() {
		return (
			<Navbar className="Header grey darken-4" brand="FES Block" right>
				{this.renderContent()}
			</Navbar>
		);
	}
}
function mapStateToProps({ auth, contract }) {
	return { auth, contract };
}
//equal to
// function mapStateToPros(state) {
// 	return { auth: state.auth };
// }
export default connect(mapStateToProps)(Header);
