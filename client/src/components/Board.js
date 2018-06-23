import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SnippetList from './snippets/SnippetList';
//import ChallengedSnippetList from './snippets/ChallengedSnippetList';
//import { Tabs, Tab } from 'react-materialize';

class Board extends Component {
	renderButton() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return <div onLoadedData={window.alert('로그인해주세요')} />;
			default:
				if (this.props.auth.certification === false) {
					return (
						<Link to="/fesauth" className="btn-floating btn-large red">
							<i className="material-icons">add</i>
						</Link>
					);
				}
				return (
					<Link to="/snippets/new" className="btn-floating btn-large red">
						<i className="material-icons">add</i>
					</Link>
				);
		}
	}
	render() {
		return (
			<div className="container">
				<blockquote style={{ margin: '10px 0 0 0' }}>
					사진 클릭 시 내용이 보이며, 마음에 들지 않는 게시물을 제거신청 할 수
					있습니다
				</blockquote>
				<SnippetList />
				<div className="fixed-action-btn">{this.renderButton()}</div>

				{/* <Tabs className="tab-demo z-depth-1">
					<Tab title="글목록(클릭!)">
						<blockquote style={{ margin: '10px 0 0 0' }}>
							사진 클릭 시 내용이 보입니다
						</blockquote>
						<SnippetList />
						<div className="fixed-action-btn">{this.renderButton()}</div>
					</Tab>
					<Tab title="퇴출 투표 중">
						<blockquote style={{ margin: '10px 0 0 0' }}>
							퇴출 신청된 목록입니다. 내가 투표한 쪽이 과반수일시 토큰을
							보상받습니다
						</blockquote>
						<ChallengedSnippetList />
					</Tab>
					<Tab title="퇴출당한 글들">
						<blockquote style={{ margin: '10px 0 0 0' }}>
							퇴출 당한 쓰레기들입니다.
						</blockquote>
					</Tab>
				</Tabs> */}
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}
export default connect(mapStateToProps)(Board);
