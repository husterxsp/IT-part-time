import {
    combineReducers
} from 'redux';
import auth from './authReducer';
import project from './projectReducer';

const rootReducer = combineReducers({
    auth,
    project
});
export default rootReducer;
