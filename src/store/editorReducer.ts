import { EditorState, EditorAction } from '../types/editor';

export const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case 'SET_CONTENT':
      return { ...state, content: action.payload };
    case 'UPDATE_CURSOR':
      return {
        ...state,
        cursors: { ...state.cursors, [action.user]: action.position },
      };
    default:
      return state;
  }
};
