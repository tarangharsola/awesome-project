{"import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';

const usersReducer = combineReducers({
  users: usersReducer
});

export default usersReducer;