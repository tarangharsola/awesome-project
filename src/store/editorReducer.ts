{"import { createReducer } from 'redux';
import { EDITOR_STATE_CHANGED } from './actions';

const editorReducer = createReducer(
  {},
  {
    [EDITOR_STATE_CHANGED]: (state, action) => action.editorState,
  }
);

export default editorReducer;