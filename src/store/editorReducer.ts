import { EditorState, EditorAction } from '../types/editor';

export const initialEditorState: EditorState = {
  content: '',
  language: 'javascript',
};

export function editorReducer(state = initialEditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_CONTENT':
      return { ...state, content: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    default:
      return state;
  }
}
