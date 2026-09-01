import { INSERT_TEXT, DELETE_TEXT, SET_LANGUAGE, SYNC_DOCUMENT } from './actionTypes';
import { EditorState } from '../types/editor';

const initialState: EditorState = {
  content: '',
  language: 'javascript',
};

export const editorReducer = (state = initialState, action: any): EditorState => {
  switch (action.type) {
    case INSERT_TEXT: {
      const { position, text } = action.payload;
      const before = state.content.slice(0, position);
      const after = state.content.slice(position);
      return { ...state, content: before + text + after };
    }
    case DELETE_TEXT: {
      const { position, length } = action.payload;
      const before = state.content.slice(0, position);
      const after = state.content.slice(position + length);
      return { ...state, content: before + after };
    }
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case SYNC_DOCUMENT:
      // Replace the entire editor state with the synced version
      return { ...action.payload };
    default:
      return state;
  }
};
