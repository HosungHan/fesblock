import axios from 'axios';
import {
	FETCH_USER,
	FETCH_FESMEMBERS,
	FETCH_SNIPPETS,
	FETCH_ALL_USERS
} from './types';

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchAllUsers = () => async dispatch => {
	const res = await axios.get('/api/all_users');

	dispatch({ type: FETCH_ALL_USERS, payload: res.data });
};

export const fetchFesmembers = () => async dispatch => {
	const res = await axios.get('/api/fesmembers');

	dispatch({ type: FETCH_FESMEMBERS, payload: res.data });
};

export const fetchSnippets = () => async dispatch => {
	const res = await axios.get('/api/snippets');

	dispatch({ type: FETCH_SNIPPETS, payload: res.data });
};

export const fetchChallengedSnippets = () => async dispatch => {
	const res = await axios.get('/api/snippets/isChallenged');

	dispatch({ type: FETCH_SNIPPETS, payload: res.data });
};

export const submitSnippet = (values, history) => async dispatch => {
	const res = await axios.post('/api/snippets', values);

	history.push('/board');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitChallenge = (values, history) => async dispatch => {
	const res = await axios.post('/api/snippets/challenge', values);

	history.push('/board');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const vote = (snippetId, yes, no) => async dispatch => {
	const values = { snippetId, yes, no };
	const res = await axios.post('/api/snippets/vote', values);
	//	dispatch({ type: FETCH_USER, payload: res.data });
	window.alert(res.data);
};
