import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Language = 'javascript' | 'python' | 'html';

export interface EditorState {
  content: string;
  language: Language;
}

const initialState: EditorState = {
  content: '',
  language: 'javascript',
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setContent(state, action: PayloadAction<string>) {
      state.content = action.payload;
    },
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
  },
});

export const { setContent, setLanguage } = editorSlice.actions;
export default editorSlice.reducer;