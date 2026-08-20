import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language } from '../types';

interface EditorState {
  language: Language;
  content: string;
}

const initialState: EditorState = {
  language: 'javascript',
  content: ''
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
    setContent(state, action: PayloadAction<string>) {
      state.content = action.payload;
    }
  }
});

export const { setLanguage, setContent } = editorSlice.actions;
export default editorSlice.reducer;
