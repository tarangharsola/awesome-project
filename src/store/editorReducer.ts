{"import { createReducer } from 'redux';
import { EditorState } from 'draft-js';

const initialState = EditorState.createEmpty();

const editorReducer = createReducer(initialState, {
  EDITOR_STATE_CHANGED: (state, action) => action.editorState,
});

export default editorReducer;