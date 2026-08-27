export interface EditorState {
  content: string;
  language: string;
}

export type EditorAction =
  | { type: 'SET_CONTENT'; payload: string }
  | { type: 'SET_LANGUAGE'; payload: string };
