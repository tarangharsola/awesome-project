export type Language = 'javascript' | 'python' | 'html';

export interface EditorState {
  content: string;
  language: Language;
  // other editor state fields can be added here
}
