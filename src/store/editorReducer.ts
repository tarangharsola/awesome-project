{"import { combineReducers } from 'redux';
import { EditorState } from 'draft-js';

const editorReducer = combineReducers({
  editorState: (state = EditorState.createEmpty(), action) => {
    switch (action.type) {
      case 'UPDATE_EDITOR_STATE':
        return action.editorState;
      default:
        return state;
    }
  },
});

export default editorReducer;