{"import { createReducer } from 'redux';

interface EditorState {
  code: string;
  cursor: { x: number; y: number; }
}

const editorReducer = createReducer<EditorState>({}, {
  UPDATE_CODE: (state, action) => ({ code: action.payload.code }),
  UPDATE_CURSOR: (state, action) => ({ cursor: action.payload.cursor })
});

export default editorReducer;