{"import { createReducer } from 'redux';
import { EDITOR_VALUE_CHANGED } from './actions';

const initialState = '';

const editorReducer = createReducer(initialState, {
  [EDITOR_VALUE_CHANGED]: (state, action) => action.payload,
});

export default editorReducer;