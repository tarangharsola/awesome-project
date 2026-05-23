{"import { User } from './user';
import { Reducer } from 'redux';

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersReducer: Reducer<UsersState> = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default usersReducer;