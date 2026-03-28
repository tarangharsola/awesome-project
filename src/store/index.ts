{"import { createStore, combineReducers } from 'redux';
import editorReducer from './editorReducer';
import usersReducer from './usersReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  editor: editorReducer,
  users: usersReducer,
  user: userReducer
});

const store = createStore(rootReducer);

export default store;