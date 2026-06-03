{"import { createReducer } from 'redux';
import { EditorState } from 'prosemirror-state';

const editorReducer = createReducer(
  (state = EditorState.create(), action) => {
    switch (action.type) {
      case 'INPUT':
        return EditorState.applyDelta(state, action.delta);
      default:
        return state;
    }
  }
);

export default editorReducer;