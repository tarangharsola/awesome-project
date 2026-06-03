{"import { createReducer } from 'redux';
import { EDITOR_STATE } from './types';

const initialState = {
  editorState: EditorState.createEmpty(),
  cursorPosition: { x: 0, y: 0 }
};

const editorReducer = createReducer(initialState, {
  [EDITOR_STATE]: (state, action) => {
    return {
      ...state,
      editorState: action.editorState,
      cursorPosition: action.cursorPosition
    };
  }
});

export default editorReducer;