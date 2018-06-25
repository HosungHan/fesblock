import { FETCH_CONTRACT } from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_CONTRACT:
			return action.payload;
		default:
			return state;
	}
}
