{"import { Reducer } from 'redux';
import { JOIN, LEAVE, JoinAction, LeaveAction } from './actions';

const initialState = {
  users: [],
};

const usersReducer: Reducer = (state = initialState, action: ActionT) => {
  switch (action.type) {
    case JOIN:
      return {
        ...state,
        users: [...state.users, action.data.users[0]],
      };
    case LEAVE:
      return {
        ...state,
        users: state.users.filter((user) => user !== action.data.users[0]),
      };
    default:
      return state;
  }
};

export default usersReducer;