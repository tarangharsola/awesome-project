{"import { createReducer, on } from 'redux';
import { EDITOR_CHANGE } from './actions';

const initialState = {
  code: '',
  cursorPosition: 0,
  language: 'javascript'
};

const editorReducer = createReducer(initialState, {
  [EDITOR_CHANGE]: (state, { code, cursorPosition, language }) => ({
    code,
    cursorPosition,
    language
  })
});

export default editorReducer;