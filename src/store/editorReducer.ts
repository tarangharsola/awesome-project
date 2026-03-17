{"import { createReducer } from 'redux';

interface EditorState {
  code: string;
  cursor: { x: number; y: number; }
  users: { [key: string]: { name: string; color: string } }
}

const initialState: EditorState = {
  code: '',
  cursor: { x: 0, y: 0 },
  users: {}
};

const editorReducer = createReducer(initialState, {
  UPDATE_CODE: (state, action) => ({ ...state, code: action.payload.code }),
  UPDATE_CURSOR: (state, action) => ({ ...state, cursor: action.payload.cursor }),
  UPDATE_USERS: (state, action) => ({ ...state, users: action.payload.users })
});

export default editorReducer;