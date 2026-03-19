{"import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

const initialState = fromJS({ code: '', users: [], cursorPositions: {} });

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CODE':
      return state.set('code', action.data);
    case 'UPDATE_USERS':
      return state.set('users', action.data);
    case 'UPDATE_CURSOR_POSITIONS':
      return state.set('cursorPositions', action.data);
    default:
      return state;
  }
};

export default editorReducer;