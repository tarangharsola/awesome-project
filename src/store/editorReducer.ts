{"import { createReducer } from 'redux';
import { EDITOR_STATE_CHANGED } from './actions';

const initialState = {};

const editorReducer = createReducer(initialState, {
  [EDITOR_STATE_CHANGED]: (state, action) => action.editorState,
});

export default editorReducer;