import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { Row, Col, Input, Toast } from 'react-materialize';
import axios from 'axios';

class FesAuth extends Component {
	state = {
		group: '',
		name: '',
		email: ''
	};
	renderContent() {
		switch (this.props.fes) {
			case null:
				return <div>로딩중</div>;
			default:
				var group = {};
				var keys = [];
				var fesad = 'http://fes.kr';
				group = _.groupBy(this.props.fes, 'group');
				keys = Object.keys(group).sort();
				return (
					<div className="container">
						<Row>
							<Col s={10} offset="s3">
								<Input
									onChange={event =>
										this.setState({ group: event.target.value })
									}
									type="select"
									label="FES기수 선택"
								>
									<option disabled selected>
										기수
									</option>
									{_.map(keys, value => (
										<option key={value} value={value}>
											{value}
										</option>
									))}
								</Input>
								<Input
									onChange={event => {
										const user = _.find(group[this.state.group], {
											group: this.state.group,
											name: event.target.value
										});

										this.setState({
											name: user.name,
											email: user.email
										});
									}}
									type="select"
									label="본인선택"
								>
									<option disabled selected>
										이름
									</option>
									{_.map(group[this.state.group], value => (
										<option
											key={value.name}
											value={value.name}
											data-icon={fesad + value.pic}
										>
											{value.name}
										</option>
									))}
								</Input>
							</Col>
						</Row>
					</div>
				);
		}
	}
	sendEmail() {
		axios
			.post('/api/fesauth', { email: this.state.email })
			.then(console.log('메일전송완료'));
	}
	render() {
		return (
			<div className="center-align">
				<blockquote>
					기수와 이름을 선택하시면 FES홈페이지에 등록된 이메일로 인증메일이
					발송됩니다. 스팸함을 꼭 확인해주세요! 분명 거기 들어있음
				</blockquote>
				{this.renderContent()}
				<div className="container">
					<Row>
						<Col s={12} m={12} l={6} offset="m5">
							<Toast
								center
								displayLength="50000"
								toast={
									this.state.email
										? 'FES 홈페이지에 등록하신 메일(' +
										  this.state.email +
										  ')로 인증메일을 발송하였습니다. (스팸함 확인해주세요)'
										: '본인을 선택해주세요'
								}
							>
								<a onClick={this.sendEmail.bind(this)} className="white-text">
									확인
								</a>
							</Toast>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ fes }) {
	return { fes };
}
export default connect(mapStateToProps)(FesAuth);
