{"import { createStore, combineReducers } from 'redux';
import usersReducer from './usersReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({ users: usersReducer, user: userReducer });

const store = createStore(rootReducer);

export default store;