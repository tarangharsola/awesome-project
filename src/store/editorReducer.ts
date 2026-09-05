import { SET_CONTENT, APPLY_REMOTE_CHANGES, SET_LANGUAGE } from './actionTypes';

export interface EditorState {
  content: string;
  language: string;
}

const initialState: EditorState = {
  content: '',
  language: 'javascript',
};

export default function editorReducer(state = initialState, action: any): EditorState {
  switch (action.type) {
    case SET_CONTENT:
      return { ...state, content: action.payload };
    case APPLY_REMOTE_CHANGES:
      // In a real implementation, apply OT/CRDT changes here
      return { ...state, content: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
}