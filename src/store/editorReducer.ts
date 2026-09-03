import { EditorActionTypes, SET_LANGUAGE, FORMAT_DOCUMENT } from './editorActions';
import { EditorState } from '../types/editor';
import { formatCode } from '../utils/formatCode';

const initialState: EditorState = {
  content: '',
  language: 'javascript',
};

export const editorReducer = (state = initialState, action: EditorActionTypes): EditorState => {
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    case FORMAT_DOCUMENT:
      return { ...state, content: formatCode(state.content, state.language) };
    default:
      return state;
  }
};
