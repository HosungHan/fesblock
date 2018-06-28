//퇴출신청 당한 snippet목록을 받아와서 랜덤한 사진을 입혀 카드 생성
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchChallengedSnippets, vote } from '../../actions';
import { Col, Row, Card, CardTitle } from 'react-materialize';

class ChallengedSnippetList extends Component {
	componentDidMount() {
		this.props.fetchChallengedSnippets();
	}
	renderSnippets() {
		return this.props.snippets.map(snippet => {
			let challengedTime = new Date(snippet.lastChallenged);
			let currentTime = new Date();
			let remainingTime =
				300 -
				Math.floor(
					(currentTime.getTime() - challengedTime.getTime()) / (1000 * 60)
				);
			return (
				<div key={Math.random()}>
					<Col l={6}>
						<Card
							className="medium"
							header={
								<CardTitle
									image={
										'http://unsplash.it/600/150/?image=' +
										Math.floor(Math.random() * 50) +
										1
									}
								>
									{snippet.title}
								</CardTitle>
							}
							actions={[
								<a onClick={() => this.props.vote(snippet._id, 1, 0)}>
									퇴출찬성
								</a>,
								<a onClick={() => this.props.vote(snippet._id, 0, 1)}>
									퇴출반대
								</a>
							]}
						>
							{snippet.body}
							<blockquote style={{ margin: '10px 0 0 0' }}>퇴출사유</blockquote>
							{snippet.reasonChallenged}
							<blockquote style={{ margin: '10px 0 0 0' }}>
								투표종료까지 {remainingTime}분 남았습니다
							</blockquote>
						</Card>
					</Col>
				</div>
			);
		});
	}
	render() {
		return (
			<div>
				<Row>{this.renderSnippets()}</Row>
			</div>
		);
	}
}

function mapStateToProps({ snippets }) {
	return { snippets };
}

export default connect(mapStateToProps, { fetchChallengedSnippets, vote })(
	ChallengedSnippetList
);
