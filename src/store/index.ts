{"import { createStore, combineReducers } from 'redux';
import userReducer from './userReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({ user: userReducer, users: usersReducer });
const store = createStore(rootReducer);

export default store;