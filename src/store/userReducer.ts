{"import { combineReducers } from 'redux';
import { userState } from './userState';

const userReducer = combineReducers({
  userState,
});

export default userReducer;