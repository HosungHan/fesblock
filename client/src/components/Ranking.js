import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../actions';
import { Col, Row, Card, CardTitle, Table } from 'react-materialize';
import { contractAddress } from './params.js';
import _ from 'lodash';

class Ranking extends Component {
	componentDidMount() {
		this.props.fetchAllUsers();
	}

	renderCards() {
		if (!this.props.user) {
			return <div>로딩중</div>;
		}
		let sortedUser = _.sortBy(this.props.user, 'token');
		let ranker = _.reverse(sortedUser).splice(0, 3);
		let i = 1;
		return ranker.map(ranker => {
			return (
				<div key={ranker.id}>
					<Col l={4} m={4} s={12}>
						<Card
							horizontal
							header={<CardTitle image={'http://fes.kr/' + ranker.pic} />}
							actions={[
								<a
									href={
										'https://rinkeby.etherscan.io/token/' +
										contractAddress +
										'?a=' +
										ranker.address
									}
								>
									토큰 수:{ranker.token}개
								</a>
							]}
						>
							<h5>
								{i++}등:{ranker.group}기 {ranker.name}
							</h5>
						</Card>
					</Col>
				</div>
			);
		});
	}
	renderTable() {
		let i = 4;
		let sortedUser = _.sortBy(this.props.user, 'token');
		_.reverse(sortedUser).splice(0, 3);
		return sortedUser.map(user => {
			return (
				<tr>
					<td>{i++}등</td>
					<td>{user.group}</td>
					<td>{user.name}</td>
					<td>{user.token}</td>
				</tr>
			);
		});
	}
	render() {
		return (
			<div className="container">
				<Row>{this.renderCards()}</Row>
				<Table>
					<thead>
						<tr>
							<th data-field="rank">순위</th>
							<th data-field="id">기수</th>
							<th data-field="name">이름</th>
							<th data-field="price">토큰 수</th>
						</tr>
					</thead>

					<tbody>{this.renderTable()}</tbody>
				</Table>
			</div>
		);
	}
}

function mapStateToProps({ user }) {
	return { user };
}
export default connect(mapStateToProps, { fetchAllUsers })(Ranking);
