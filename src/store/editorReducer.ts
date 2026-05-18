{"import { createReducer } from 'redux';

const editorReducer = createReducer(
  {
    value: '',
    language: 'javascript',
  },
  {
    EDITOR_VALUE: (state, action) => ({ ...state, value: action.payload }),
    LANGUAGE: (state, action) => ({ ...state, language: action.payload }),
  }
);

export default editorReducer;