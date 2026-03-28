{"import { combineReducers } from 'redux';
import { editorReducer } from './editorReducer';

const editorReducer = combineReducers({
  editor: editorReducer
});

export default editorReducer;