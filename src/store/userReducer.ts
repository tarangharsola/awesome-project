{"import { combineReducers } from 'redux';
import { UserState } from './userReducerTypes';

const userReducer = combineReducers({
  userState: userStateReducer,
});

export default userReducer;