import { EditorState, EditorAction } from './actionTypes';

const initialState: EditorState = {
  content: '',
  language: 'javascript', // default language
  // ...other state fields
};

export const editorReducer = (state = initialState, action: EditorAction): EditorState => {
  switch (action.type) {
    case 'SET_CONTENT':
      return { ...state, content: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    // ...other cases
    default:
      return state;
  }
};
