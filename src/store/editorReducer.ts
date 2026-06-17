{"import { createReducer } from 'redux';

interface State {
  code: string;
  cursorPosition: number;
}

const initialState: State = {
  code: '',
  cursorPosition: 0,
};

const editorReducer = createReducer(initialState, {
  SEND_CODE: (state, action) => {
    return {
      ...state,
      code: action.payload,
    };
  },
  RECEIVE_CODE: (state, action) => {
    return {
      ...state,
      code: action.payload,
    };
  },
  UPDATE_CURSOR_POSITION: (state, action) => {
    return {
      ...state,
      cursorPosition: action.payload,
    };
  },
});

export default editorReducer;