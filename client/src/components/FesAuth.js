import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Toast, Autocomplete } from 'react-materialize';
import axios from 'axios';

class FesAuth extends Component {
	state = {
		email: ''
	};
	renderContent() {
		switch (this.props.fes) {
			case null:
				return <div>로딩중</div>;
			default:
				let data = {};
				let emails = {};
				const fesWeb = 'http://fes.kr';
				_.map(this.props.fes, user => {
					let name = user.group + '기 ' + user.name;
					let picAddress = fesWeb + user.pic;
					data[name] = picAddress;
					emails[name] = user.email;
				});

				return (
					<div className="container">
						<Autocomplete
							title="XX기 XXX 입력"
							data={data}
							onChange={async (event, value) => {
								await this.setState({ email: emails[value] });
							}}
						/>
					</div>
				);
		}
	}
	sendEmail = () => {
		axios
			.post('/api/fesauth', { email: this.state.email })
			.then(console.log(`${this.state.email}에게 메일전송완료`));
	};
	render() {
		return (
			<div className="center-align container">
				<blockquote>
					기수와 이름을 선택하시면 FES홈페이지에 등록된 이메일로 인증메일이
					발송됩니다. 스팸함을 꼭 확인해주세요! 분명 거기 들어있음
				</blockquote>
				{this.renderContent()}
				<div className="container">
					<Row>
						<Col s={12} m={12} l={6} offset="m5">
							<form
								onSubmit={e => {
									e.preventDefault();
									this.sendEmail();
								}}
							>
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
									확인
								</Toast>
							</form>
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
