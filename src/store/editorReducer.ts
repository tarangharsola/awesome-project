{"import { createReducer } from 'redux';
import { EDITOR_CODE_CHANGE } from './actions';

const initialState = {
  code: '',
  users: [],
};

const editorReducer = createReducer(initialState, {
  [EDITOR_CODE_CHANGE]: (state, action) => ({
    ...state,
    code: action.code,
  }),
});

export default editorReducer;