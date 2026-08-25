import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Y from 'yjs';

interface EditorState {
  content: string;
  ydoc: Y.Doc;
}

const initialState: EditorState = {
  content: '',
  ydoc: new Y.Doc(),
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    localChange(state, action: PayloadAction<string>) {
      state.content = action.payload;
      const yText = state.ydoc.getText('code');
      yText.delete(0, yText.length);
      yText.insert(0, action.payload);
    },
    remoteChange(state, action: PayloadAction<string>) {
      state.content = action.payload;
      const yText = state.ydoc.getText('code');
      yText.delete(0, yText.length);
      yText.insert(0, action.payload);
    },
    syncDocument(state, action: PayloadAction<string>) {
      const yText = state.ydoc.getText('code');
      yText.delete(0, yText.length);
      yText.insert(0, action.payload);
      state.content = action.payload;
    },
  },
});

export const { localChange, remoteChange, syncDocument } = editorSlice.actions;
export default editorSlice.reducer;
