{"import { EditorState } from 'draft-js';

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