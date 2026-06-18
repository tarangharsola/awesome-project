{"import { createReducer } from 'redux';

const initialState = {
  content: '',
  language: 'javascript'
};

const editorReducer = createReducer(initialState, {
  UPDATE_EDITOR_CONTENT: (state, action) => {
    return {
      ...state,
      content: action.content
    };
  },
  UPDATE_LANGUAGE: (state, action) => {
    return {
      ...state,
      language: action.language
    };
  }
});

export default editorReducer;