{"import { createReducer } from 'redux';
import { UPDATE_EDITOR_CONTENT } from './actions';

const initialState = '';

const editorReducer = createReducer(initialState, {
  [UPDATE_EDITOR_CONTENT]: (state, action) => action.content,
});

export default editorReducer;