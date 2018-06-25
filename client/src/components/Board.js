import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SnippetList from './snippets/SnippetList';

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
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}
export default connect(mapStateToProps)(Board);
