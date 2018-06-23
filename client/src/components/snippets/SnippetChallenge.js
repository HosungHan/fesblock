//snippet목록을 받아와서 랜덤한 사진을 입혀 카드를 만듬
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSnippets, submitChallenge } from '../../actions';
import { Link } from 'react-router-dom';
import { Col, Row, Input } from 'react-materialize';
import { challengeFee, challengeReward } from '../params.js';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

class SnippetChallenge extends Component {
	state = {
		snippetId: '',
		reasonChallenged: ''
	};
	componentDidMount() {
		this.props.actions.fetchSnippets();
		const currentSnippetId = _.replace(
			this.props.location.pathname,
			'/snippets/challenge/',
			''
		);
		this.setState({ snippetId: currentSnippetId });
	}
	renderSnippets() {
		const currentSnippet = _.find(this.props.snippets, {
			_id: this.state.snippetId
		});
		return (
			<div>
				<Col l={6} offset="l3">
					<div className="card">
						<div className="card-image waves-effect waves-block waves-light">
							<img
								className="activator"
								src={
									'http://unsplash.it/600/150/?image=' +
									Math.floor(Math.random() * 50) +
									1
								}
							/>
						</div>
						<div className="card-content">
							<span className="card-title activator grey-text text-darken-4">
								{currentSnippet ? currentSnippet.title : '로딩중'}
							</span>
							<span className="card-title activator grey-text text-darken-4">
								{currentSnippet ? currentSnippet.body : '로딩중'}
							</span>
						</div>
					</div>
					<blockquote style={{ marginBottom: '0' }}>
						신청시 {challengeFee}개의 토큰이 소요되며 성공시 {challengeReward}개의
						토큰이 보상 지급됩니다. 유저 투표를 통해 일정 기간동안 투표자
						과반수의 찬성을 받으면 성공합니다.위 글을 목록에서 제거
						신청하시겠습니까?
					</blockquote>
				</Col>
			</div>
		);
	}
	render() {
		return (
			<div className="center-align">
				<Row>{this.renderSnippets()}</Row>
				<Row>
					<Col l={3} />
					<Input
						offset="l3"
						l={6}
						s={12}
						type="text"
						onChange={event =>
							this.setState({
								reasonChallenged: event.target.value
							})
						}
						label="제거 사유"
					/>
				</Row>
				<Row>
					<Col l={3} />
					<Col l={6} s={12}>
						<Link
							to="/board"
							className="grey darken-4 btn-flat left white-text"
						>
							Back
						</Link>
						<button
							onClick={() =>
								this.props.actions.submitChallenge(
									this.state,
									this.props.history
								)
							}
							type="submit"
							className="teal btn-flat right white-text"
						>
							확인<i className="material-icons right">done</i>
						</button>
					</Col>
				</Row>
			</div>
		);
	}
}

// function mapStateToProps(state) {
//   return { snippets: state.snippets}
// }
function mapStateToProps({ snippets }) {
	return { snippets };
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			fetchSnippets: bindActionCreators(fetchSnippets, dispatch),
			submitChallenge: bindActionCreators(submitChallenge, dispatch)
		}
	};
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SnippetChallenge)
);
