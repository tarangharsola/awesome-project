import { DocumentState } from '../types/collaboration';
import { EDIT_CONTENT, SET_CONTENT } from './actionTypes';

interface Action {
  type: string;
  payload?: any;
}

const initialState: DocumentState = {
  content: '',
  version: 0,
};

export const editorReducer = (state = initialState, action: Action): DocumentState => {
  switch (action.type) {
    case EDIT_CONTENT:
      return {
        content: action.payload.content,
        version: state.version + 1,
      };
    case SET_CONTENT:
      return {
        content: action.payload.content,
        version: action.payload.version,
      };
    default:
      return state;
  }
};