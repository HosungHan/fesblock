//snippet form과 snippet review를 담는 역할
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SnippetForm from './SnippetForm';
import SnippetReview from './SnippetReview';

class SnippetNew extends Component {
	state = { showReview: false };
	renderContent() {
		if (this.state.showReview) {
			return (
				<SnippetReview onCancel={() => this.setState({ showReview: false })} />
			);
		}
		return (
			<SnippetForm
				onSnippetSubmit={() => this.setState({ showReview: true })}
			/>
		);
	}
	render() {
		return <div>{this.renderContent()}</div>;
	}
}

export default reduxForm({ form: 'snippetForm' })(SnippetNew);
