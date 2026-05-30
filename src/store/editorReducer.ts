{"import { createReducer } from 'redux';
import { EDITOR_STATE_CHANGED } from './actions';

const initialState = {
  editorState: EditorState.createEmpty(),
  cursorPositions: {},
};

const editorReducer = createReducer(initialState, {
  [EDITOR_STATE_CHANGED]: (state, action) => {
    return {
      ...state,
      editorState: action.editorState,
    };
  },
});

export default editorReducer;