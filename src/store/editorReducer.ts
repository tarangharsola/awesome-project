{"import { combineReducers } from 'redux';
import { EditorState } from 'draft-js';

const editorReducer = (state = EditorState.createEmpty(), action) => {
  switch (action.type) {
    case 'UPDATE_EDITOR_STATE':
      return action.editorState;
    default:
      return state;
  }
};

export default editorReducer;