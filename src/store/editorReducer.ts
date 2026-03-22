{"import { combineReducers } from 'redux';
import { editorReducer } from './editorReducer';
import { usersReducer } from './usersReducer';

const rootReducer = combineReducers({
  editor: editorReducer,
  users: usersReducer
});

export default rootReducer;