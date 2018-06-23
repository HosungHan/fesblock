import { FETCH_FESMEMBERS } from '../actions/types';

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_FESMEMBERS:
			return action.payload;
		default:
			return state;
	}
}
