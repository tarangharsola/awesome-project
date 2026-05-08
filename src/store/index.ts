{"import { createStore, combineReducers } from 'redux';
import usersReducer from './usersReducer';
import editorReducer from './editorReducer';

const rootReducer = combineReducers({ users: usersReducer, editor: editorReducer });

const store = createStore(rootReducer);

export default store;