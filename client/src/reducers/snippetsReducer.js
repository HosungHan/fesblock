import { FETCH_SNIPPETS } from '../actions/types';

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_SNIPPETS:
			return action.payload;
		default:
			return state;
	}
}
