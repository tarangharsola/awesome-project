import { EditorAction, SET_LANGUAGE } from './editorActions';

export interface EditorState {
  language: string;
  // other editor state fields can be added here
}

const initialState: EditorState = {
  language: 'javascript',
};

export const editorReducer = (
  state: EditorState = initialState,
  action: EditorAction
): EditorState => {
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};
