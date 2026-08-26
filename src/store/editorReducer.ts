import { DocumentChange, UserCursor } from '../types/editor';

export interface EditorState {
  content: string;
  cursors: Record<string, UserCursor>;
}

type Action =
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'APPLY_CHANGE'; payload: DocumentChange }
  | { type: 'UPDATE_CURSOR'; payload: UserCursor };

export const editorReducer = (state: EditorState, action: Action): EditorState => {
  switch (action.type) {
    case 'SET_CONTENT':
      return { ...state, content: action.payload };
    case 'APPLY_CHANGE': {
      const { range, text } = action.payload;
      const lines = state.content.split('\n');
      const startIdx = range.startLineNumber - 1;
      const endIdx = range.endLineNumber - 1;
      const before = lines.slice(0, startIdx);
      const after = lines.slice(endIdx + 1);
      const newLines = [...before, text, ...after];
      return { ...state, content: newLines.join('\n') };
    }
    case 'UPDATE_CURSOR':
      return {
        ...state,
        cursors: {
          ...state.cursors,
          [action.payload.userId]: action.payload,
        },
      };
    default:
      return state;
  }
};