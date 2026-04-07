{"import { Reducer } from 'redux';
import { JOIN, LEAVE, JoinAction, LeaveAction } from './actions';

const initialState = {
  code: '',
  users: [],
  cursorPositions: {},
};

const editorReducer: Reducer = (state = initialState, action: ActionT) => {
  switch (action.type) {
    case JOIN:
      return {
        ...state,
        code: action.data.code,
        users: action.data.users,
        cursorPositions: action.data.cursorPositions,
      };
    case LEAVE:
      return {
        ...state,
        code: action.data.code,
        users: action.data.users,
        cursorPositions: action.data.cursorPositions,
      };
    default:
      return state;
  }
};

export default editorReducer;