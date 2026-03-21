{"import { Reducer } from 'redux';
import { Action } from './actions';

const initialState = {};

const usersReducer: Reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return {
        ...state,
        [action.id]: action.id,
      };
    case 'LEAVE_ROOM':
      return {
        ...state,
        [action.id]: null,
      };
    case 'UPDATE_ROOM':
      return action.users.reduce((acc, user) => ({
        ...acc,
        [user.id]: user,
      }), {});
    default:
      return state;
  }
};

export default usersReducer;