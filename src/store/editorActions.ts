import { EditorAction } from './actionTypes';

export const setLanguage = (language: string): EditorAction => ({
  type: 'SET_LANGUAGE',
  payload: language,
});

// Existing action creators (preserved for context)
// export const setContent = (content: string): EditorAction => ({
//   type: 'SET_CONTENT',
//   payload: content,
// });
