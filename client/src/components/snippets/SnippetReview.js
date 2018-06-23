//작성 글을 리뷰
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import { postingFee } from '../params.js';

const SnippetReview = ({ onCancel, formValues, submitSnippet, history }) => {
	console.log(formValues);
	return (
		<div className="container">
			<blockquote>제목을 확인해주세요</blockquote>
			<p className="flow-text">{formValues.title}</p>
			<blockquote>내용을 확인해주세요</blockquote>
			<p className="flow-text">{formValues.body}</p>
			<blockquote>
				제출시 {postingFee}개의 토큰이 제출되며 취소하실 수 없습니다
			</blockquote>

			<button className="grey darken-4 btn-flat white-text" onClick={onCancel}>
				Back
			</button>
			<button
				onClick={() => submitSnippet(formValues, history)}
				className="teal btn-flat right white-text"
			>
				제출
				<i className="material-icons right">done</i>
			</button>
		</div>
	);
};
function mapStateToProps(state) {
	return { formValues: state.form.snippetForm.values };
}
export default connect(mapStateToProps, actions)(withRouter(SnippetReview));
