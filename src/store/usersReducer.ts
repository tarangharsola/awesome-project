import { combineReducers } from 'redux';
import { UsersState } from './users';

const usersReducer = combineReducers({
   users: usersReducer,
});

export default usersReducer;