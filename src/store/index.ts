{"import { createStore, combineReducers } from 'redux';
import editorReducer from './editorReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  editor: editorReducer,
  user: userReducer
});

const store = createStore(rootReducer);

export default store;