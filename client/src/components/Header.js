import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavItem } from 'react-materialize';
import { contractAddress } from './params.js';

const brandColor = <span style={{ color: '#ffffff' }}>FES Block</span>;

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<div>
						<NavItem>
							<a href="/ranking">랭킹</a>
						</NavItem>
						<NavItem>
							<a href="/auth/google">간편 로그인</a>
						</NavItem>
					</div>
				);
			default:
				if (this.props.auth.certification === false) {
					return (
						<div>
							<NavItem>
								<a href="/fesauth">FES회원인증</a>
							</NavItem>
							<NavItem>
								<a href="/ranking">랭킹</a>
							</NavItem>
							<NavItem>
								<a href="/api/logout">로그아웃</a>
							</NavItem>
						</div>
					);
				}
				return (
					<div>
						<NavItem>
							<a href="/board">게시판</a>
						</NavItem>
						<NavItem>
							<a href="/board/challenged">투표하기</a>
						</NavItem>
						<NavItem>
							<a
								href={
									'https://rinkeby.etherscan.io/token/' +
									contractAddress +
									'?a=' +
									this.props.auth.address
								}
							>
								FES토큰: {this.props.auth.token}개
							</a>
						</NavItem>
						<NavItem>
							<a href="/ranking">랭킹</a>
						</NavItem>
						<NavItem>
							<a href="/api/logout">로그아웃</a>
						</NavItem>
					</div>
				);
		}
	}

	render() {
		return (
			<Navbar className="Header grey darken-4" brand={brandColor} right>
				{this.renderContent()}
			</Navbar>
		);
	}
}
function mapStateToProps({ auth }) {
	return { auth };
}
//equal to
// function mapStateToPros(state) {
// 	return { auth: state.auth };
// }
export default connect(mapStateToProps)(Header);
