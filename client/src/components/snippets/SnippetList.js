//snippet목록을 받아와서 랜덤한 사진을 입혀 카드를 만듬
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSnippets } from '../../actions';
import { Col, Row } from 'react-materialize';

class SnippetList extends Component {
	componentDidMount() {
		this.props.fetchSnippets();
	}
	renderSnippets() {
		return this.props.snippets.map(snippet => {
			return (
				<div key={Math.random()}>
					<Col l={6}>
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
									{snippet.title}
									<i className="material-icons right">more_vert</i>
								</span>
								<p>
									<a href={'/snippets/challenge/' + snippet._id}>
										목록에서 제외시키기 (성공시 토큰 획득)
									</a>
								</p>
							</div>
							<div className="card-reveal">
								<span className="card-title grey-text text-darken-4">
									{snippet.title}
									<i className="material-icons right">close</i>
								</span>
								<p>{snippet.body}</p>
							</div>
						</div>
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

// function mapStateToProps(state) {
//   return { snippets: state.snippets}
// }
function mapStateToProps({ snippets }) {
	return { snippets };
}

export default connect(mapStateToProps, { fetchSnippets })(SnippetList);
