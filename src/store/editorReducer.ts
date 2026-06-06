{"import { combineReducers } from 'redux';

const editorReducer = combineReducers({
  code: (state = '', action) => {
    switch (action.type) {
      case 'UPDATE_CODE':
        return action.payload;
      default:
        return state;
    }
  },
  language: (state = 'javascript', action) => {
    switch (action.type) {
      case 'UPDATE_LANGUAGE':
        return action.payload;
      default:
        return state;
    }
  }
});

export default editorReducer;