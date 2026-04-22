import { combineReducers } from 'redux';
import { UserState } from './user';

const userReducer = combineReducers({
   user: userReducer,
});

export default userReducer;