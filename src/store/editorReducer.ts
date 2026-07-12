{"import { combineReducers } from 'redux';
import { editorState } from './editorState';

const editorReducer = combineReducers({
  editorState,
});

export default editorReducer;