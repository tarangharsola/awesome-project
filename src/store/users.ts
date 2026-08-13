{"import { createStore } from 'redux';
import { usersReducer } from './usersReducer';

const initialState = [];

const store = createStore(usersReducer, initialState);

export default store;