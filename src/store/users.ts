{"import { createStore, combineReducers } from 'redux';
import { usersReducer } from './usersReducer';

const store = createStore(usersReducer);

export { store };
