{"import { createReducer } from 'redux';
import { EDITOR_UPDATE_CODE, EDITOR_UPDATE_CURSOR } from './editorActions';

const initialState = {
  code: '',
  cursor: { x: 0, y: 0 }
};

const editorReducer = createReducer(initialState, {
  [EDITOR_UPDATE_CODE]: (state, { code }) => ({ ...state, code }),
  [EDITOR_UPDATE_CURSOR]: (state, { cursor }) => ({ ...state, cursor })
});

export default editorReducer;