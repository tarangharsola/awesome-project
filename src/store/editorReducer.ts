{"import { createReducer } from 'redux';
import { EDITOR_CODE_CHANGED, EDITOR_CURSOR_UPDATED } from './editorActions';

const initialState = {
  code: '',
  cursor: { x: 0, y: 0 },
};

const editorReducer = createReducer(initialState, {
  [EDITOR_CODE_CHANGED]: (state, { code }) => ({ ...state, code }),
  [EDITOR_CURSOR_UPDATED]: (state, { cursor }) => ({ ...state, cursor }),
});

export default editorReducer;