{"import { combineReducers } from 'redux';
import { EditorState } from 'draft-js';

const editorReducer = combineReducers({
  editorState: (state = EditorState.createEmpty(), action) => {
    switch (action.type) {
      case 'EDITOR_STATE_CHANGED':
        return action.editorState;
      default:
        return state;
    }
  },
  cursorPosition: (state = {}, action) => {
    switch (action.type) {
      case 'CURSOR_POSITION_CHANGED':
        return action.cursorPosition;
      default:
        return state;
    }
  }
});
export default editorReducer;