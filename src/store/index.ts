{"import { createStore, combineReducers } from 'redux';
import { reducer as userReducer } from './user';
import { reducer as editorReducer } from './editor';

const rootReducer = combineReducers({ user: userReducer, editor: editorReducer });

const store = createStore(rootReducer);

export default store;