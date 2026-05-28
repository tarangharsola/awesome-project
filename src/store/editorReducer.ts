{"import { createReducer } from 'redux';
import { EDITOR_STATE } from './actions';

const editorReducer = createReducer(
  {},
  {
    [EDITOR_STATE]: (state, action) => ({
      ...state,
      editorState: action.payload,
    }),
  }
);

export default editorReducer;