import { FETCH_ALL_USERS } from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_ALL_USERS:
			return action.payload;
		default:
			return state;
	}
}
