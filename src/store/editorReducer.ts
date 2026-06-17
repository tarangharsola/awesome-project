import { createReducer } from '@reduxjs/toolkit';
import { EditorAction } from './editorActions';

const editorReducer = createReducer({
  code: '',
  language: 'javascript'
}, {
  [EditorAction.setCode]: (state, action) => ({ ...state, code: action.payload }),
  [EditorAction.setLanguage]: (state, action) => ({ ...state, language: action.payload })
});

export default editorReducer;