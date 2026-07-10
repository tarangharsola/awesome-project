{"import { createReducer } from 'redux';
import { EDITOR_VALUE_CHANGED } from './actions';

const initialState = {
  value: '',
  language: 'javascript'
};

const editorReducer = createReducer(initialState, {
  [EDITOR_VALUE_CHANGED]: (state, action) => ({
    value: action.value,
    language: action.language
  })
});

export default editorReducer;