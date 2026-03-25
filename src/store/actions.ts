import { EditorState, ContentState } from 'draft-js';

export const updateEditorState = (editorState: EditorState) => ({
  type: 'UPDATE_EDITOR_STATE',
  editorState,
});

export const addUser = (user: any) => ({
  type: 'ADD_USER',
  user,
});

export const removeUser = (user: any) => ({
  type: 'REMOVE_USER',
  user,
});