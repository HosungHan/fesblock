import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Board from './Board';
import ChallengedBoard from './ChallengedBoard';
import FesAuth from './FesAuth';
import SnippetNew from './snippets/SnippetNew';
import SnippetChallenge from './snippets/SnippetChallenge';
import Ranking from './Ranking';
import Details from './details';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
		this.props.fetchFesmembers();
		this.props.fetchAllUsers();
		this.props.fetchContract();
	}
	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/board" component={Board} />
						<Route exact path="/board/challenged" component={ChallengedBoard} />
						<Route exact path="/snippets/new" component={SnippetNew} />
						<Route exact path="/fesauth" component={FesAuth} />
						<Route path="/snippets/challenge" component={SnippetChallenge} />
						<Route exact path="/ranking" component={Ranking} />
						<Route exact path="/details" component={Details} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
