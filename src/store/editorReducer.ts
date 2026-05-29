{"import { createReducer } from 'redux';
import { EditorState } from 'draft-js';

const initialState = EditorState.createEmpty();

const editorReducer = createReducer(initialState, {
  UPDATE_EDITOR_STATE: (state, action) => action.editorState,
});

export default editorReducer;