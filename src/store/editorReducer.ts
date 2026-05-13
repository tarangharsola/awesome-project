{"import { combineReducers } from 'redux';
import { EditorState } from './editorReducerTypes';

const editorReducer = combineReducers({
  editorState: editorStateReducer,
});

export default editorReducer;