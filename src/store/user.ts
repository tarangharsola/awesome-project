{"import { createStore, combineReducers } from 'redux';
import { userReducer } from './userReducer';

const store = createStore(userReducer);

export { store };