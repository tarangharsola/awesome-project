{"import { Reducer } from 'redux';
import { Action } from './actions';

const initialState = [];

const userReducer: Reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return [...state, action.id];
    case 'LEAVE_ROOM':
      return state.filter((id) => id !== action.id);
    case 'UPDATE_ROOM':
      return action.users;
    default:
      return state;
  }
};

export default userReducer;