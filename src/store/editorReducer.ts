{"import { combineReducers } from 'redux';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

const editorReducer = combineReducers({
  state: (state = EditorState.create(), action) => {
    switch (action.type) {
      case 'UPDATE_EDITOR_STATE':
        return action.payload;
      default:
        return state;
    }
  },
});

export default editorReducer;