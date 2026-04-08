import { createReducer } from '@reduxjs/toolkit';
import { EditorAction } from './editorActions';

const initialState = {
  editorState: '',
};

const editorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(EditorAction.setText, (state, action) => {
      return { ...state, editorState: action.payload };
    });
});

export default editorReducer;