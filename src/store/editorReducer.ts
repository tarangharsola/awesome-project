{"import { createReducer } from 'redux';

interface State {
  code: string;
  language: string;
}

const editorReducer = createReducer<State>({}, {
  UPDATE_CODE: (state, action) => {
    return { ...state, code: action.code };
  },
  UPDATE_LANGUAGE: (state, action) => {
    return { ...state, language: action.language };
  },
});

export default editorReducer;