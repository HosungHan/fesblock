import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ChallengedSnippetList from './snippets/ChallengedSnippetList';

class ChallengedBoard extends Component {
	renderButton() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return <div onLoadedData={window.alert('로그인해주세요')} />;
			default:
				if (this.props.auth.certification === false) {
					return (
						<Link to="/FesAuth" className="btn-floating btn-large red">
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
					퇴출 투표중인 목록입니다. 투표에는 코인이 소모되지 않으며, 투표 완료
					시점에서 본인의 선택이 과반수를 넘을시 보상으로 코인을 받을 수 있으니
					신중히 투표해주세요
				</blockquote>
				<ChallengedSnippetList />
				<div className="fixed-action-btn">{this.renderButton()}</div>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}
export default connect(mapStateToProps)(ChallengedBoard);
