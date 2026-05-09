{"import { createReducer, on } from '@reduxjs/toolkit';
import { EditorActions } from './editorActions';

const initialState = {
  code: '',
  language: 'javascript',
  users: [],
  cursorPositions: {}
};

const editorReducer = createReducer(initialState, {
  [EditorActions.setCode]: (state, action) => ({ ...state, code: action.payload }),
  [EditorActions.setLanguage]: (state, action) => ({ ...state, language: action.payload }),
  [EditorActions.addUser]: (state, action) => ({ ...state, users: [...state.users, action.payload] }),
  [EditorActions.removeUser]: (state, action) => ({ ...state, users: state.users.filter((user) => user.id !== action.payload.id) }),
  [EditorActions.updateCursorPosition]: (state, action) => ({ ...state, cursorPositions: { ...state.cursorPositions, [action.payload.userId]: action.payload.position } })
});

export default editorReducer;