{"import { createStore, combineReducers } from 'redux';
import rootReducer from './editorReducer';
import rootReducer from './userReducer';
import rootReducer from './usersReducer';

const store = createStore(rootReducer);

export default store;