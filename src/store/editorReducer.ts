{"import { combineReducers } from 'redux';

const editorReducer = combineReducers({
  cursor: (state = { x: 0, y: 0 }, action) => {
    switch (action.type) {
      case 'UPDATE_CURSOR':
        return { x: action.x, y: action.y };
      default:
        return state;
    }
  },
  language: (state = 'javascript', action) => {
    switch (action.type) {
      case 'UPDATE_LANGUAGE':
        return action.language;
      default:
        return state;
    }
  }
});

export default editorReducer;