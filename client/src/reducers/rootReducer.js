import { combineReducers } from 'redux';
import dispute from './dispute';
import { reducer as formReduser } from 'redux-form';

const rootReducer = combineReducers({dispute, form: formReduser});

export default rootReducer;
