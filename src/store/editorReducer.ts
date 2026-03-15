{"import { createReducer } from 'redux';
import { EDITOR_STATE } from './editorTypes';

const editorReducer = createReducer(EDITOR_STATE, {
  [EDITOR_STATE.CHANGE_CURSOR]: (state, action) => ({ ...state, cursor: action.cursor }),
});

export default editorReducer;