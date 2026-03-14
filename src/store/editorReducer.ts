{"import { createReducer } from 'redux';
import { EDITOR_TEXT_CHANGED } from './actions';

const initialState = {
  text: '',
};

const editorReducer = createReducer(initialState, {
  [EDITOR_TEXT_CHANGED]: (state, action) => ({
    ...state,
    text: action.text,
  }),
});

export default editorReducer;