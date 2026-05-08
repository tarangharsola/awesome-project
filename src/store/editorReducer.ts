{"import { combineReducers } from 'redux';
import { EditorValue } from './editorValue';

const editorReducer = combineReducers({ editorValue: editorReducer });

function editorReducer(state = '', action) {
  switch (action.type) {
    case 'UPDATE_EDITOR_VALUE':
      return action.editorValue;
    default:
      return state;
  }
}

export default editorReducer;