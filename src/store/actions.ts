{"import { Action } from 'redux';

export const UPDATE_EDITOR_STATE = 'UPDATE_EDITOR_STATE';

export const updateEditorState = (text: string): Action => ({
  type: UPDATE_EDITOR_STATE,
  payload: text,
});
}