{"import { User } from './user';

interface UsersState {
  users: User[];
}

export const initialState: UsersState = {
  users: [],
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export const addUser = (user: User) => ({ type: 'ADD_USER', payload: user });
export const removeUser = (id: string) => ({ type: 'REMOVE_USER', payload: id });