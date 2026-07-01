{"import { createReducer } from 'redux';
import { EditorAction } from './types';

const editorReducer = createReducer(
  {},
  {
    [EditorAction.CHANGE_CODE]: (state, action) => ({ code: action.payload }),
  }
);

export default editorReducer;