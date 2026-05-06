// Users reducer
import { combineReducers } from 'redux';
import userReducer from './userReducer';
const usersReducer = combineReducers({ users: userReducer });
export default usersReducer;