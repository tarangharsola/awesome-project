import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  code: '',
  language: 'javascript',
};

const editorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('UPDATE_CODE', (state, action) => ({ ...state, code: action.payload }));
});

export default editorReducer;