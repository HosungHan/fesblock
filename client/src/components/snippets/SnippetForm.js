//유저가 새로운 snippet 값을 입력할수 있는 form (snippet new로 전달된다)
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { Input, Row } from 'react-materialize';

class SnippetForm extends Component {
	renderSubject({ input }) {
		return (
			<div style={{ marginTop: '40px' }}>
				<Input {...input} l={4} s={12} type="select" label="카테고리">
					<option value="">학회관련</option>
					<option value="fun">유머</option>
					<option value="knowledge">지식</option>
					<option value="secret">나만아는비밀</option>
					<option value="misc">기타</option>
				</Input>
			</div>
		);
	}
	renderTitle({ input, meta: { error, touched } }) {
		return (
			<div>
				<blockquote style={{ marginBottom: '0' }}>제목</blockquote>
				<input {...input} l={12} s={12} style={{ marginBottom: '5px' }} />
				<div className="red-text center-align" style={{ marginBottom: '20px' }}>
					{touched && error}
				</div>
			</div>
		);
	}
	renderBody({ input, meta: { error, touched } }) {
		return (
			<div>
				<blockquote style={{ marginBottom: '0' }}>간단한 내용</blockquote>
				<textarea
					className="materialize-textarea"
					{...input}
					l={12}
					s={12}
					label="내용을 적어주세요"
					style={{ marginBottom: '5px' }}
				/>
				<div className="red-text center-align" style={{ marginBottom: '20px' }}>
					{touched && error}
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="container">
				<form onSubmit={this.props.handleSubmit(this.props.onSnippetSubmit)}>
					<Row>
						<Field
							type="select"
							name="subject"
							component={this.renderSubject}
						/>
					</Row>
					<Row>
						<Field type="text" name="title" component={this.renderTitle} />
					</Row>
					<Field type="text" name="body" component={this.renderBody} />
					<Link to="/board" className="grey darken-4 btn-flat white-text">
						Back
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Next
					</button>
				</form>
			</div>
		);
	}
}
function validate(values) {
	const error = {};
	if (!values.title) {
		error.title = '제목을 입력해주세요';
	}
	if (!values.body) {
		error.body = '내용을 입력해주세요';
	}
	return error;
}

export default reduxForm({
	validate,
	form: 'snippetForm',
	destroyOnUnmount: false
})(SnippetForm);
