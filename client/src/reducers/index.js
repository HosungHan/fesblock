import { combineReducers } from 'redux';
import authReducer from './authReducer';
import fesReducer from './fesReducer';
import snippetsReducer from './snippetsReducer';
import userReducer from './userReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
	auth: authReducer,
	fes: fesReducer,
	snippets: snippetsReducer,
	form: reduxForm,
	user: userReducer
});
