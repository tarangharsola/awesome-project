import { createReducer } from '@reduxjs/toolkit';
import { EditorActions } from './editorActions';

const initialState = {
  code: '',
  language: 'javascript',
};

const editorReducer = createReducer(initialState, {
  [EditorActions.setCode]: (state, action) => ({ ...state, code: action.payload }),
  [EditorActions.setLanguage]: (state, action) => ({ ...state, language: action.payload }),
});

export default editorReducer;