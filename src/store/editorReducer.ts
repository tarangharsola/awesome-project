{"import { combineReducers } from 'redux';
import cursorReducer from './cursorReducer';
import languageReducer from './languageReducer';

const editorReducer = combineReducers({
  cursor: cursorReducer,
  language: languageReducer,
});

export default editorReducer;