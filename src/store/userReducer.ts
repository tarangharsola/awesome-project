{"import { combineReducers } from 'redux';
import usersReducer from './usersReducer';

const userReducer = combineReducers({
  users: usersReducer,
});

export default userReducer;