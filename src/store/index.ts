{"import { createStore, combineReducers } from 'redux';
import editorReducer from './editorReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  editor: editorReducer,
  user: userReducer,
  users: usersReducer
});

const store = createStore(rootReducer);

export default store;