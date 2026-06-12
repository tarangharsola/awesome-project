{"import { createStore, combineReducers } from 'redux';
import { usersReducer } from './usersReducer';

const store = createStore(combineReducers({ users: usersReducer }));

export default store;