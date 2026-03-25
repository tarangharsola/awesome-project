import { EditorState, ContentState } from 'draft-js';
import { updateEditorState } from './actions';

const initialState = EditorState.createEmpty();

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_EDITOR_STATE':
      return action.editorState;
    default:
      return state;
  }
};

export default editorReducer;