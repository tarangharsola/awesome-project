{"import { combineReducers } from 'redux';
import { userReducer } from './userReducer';

const userReducer = combineReducers({
  user: userReducer
});

export default userReducer;