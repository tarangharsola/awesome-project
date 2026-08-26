import { EditorState } from '../types/editor';

type EditorAction =
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'SET_LANGUAGE'; payload: string };

const initialState: EditorState = {
  content: '',
  language: 'javascript',
};

export default function editorReducer(state = initialState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_CONTENT':
      return { ...state, content: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    default:
      return state;
  }
}
