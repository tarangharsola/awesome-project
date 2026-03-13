{"import { combineReducers } from 'redux';
import { editorState } from './editor';

const rootReducer = combineReducers({
  editor: editorState,
});

export default rootReducer;