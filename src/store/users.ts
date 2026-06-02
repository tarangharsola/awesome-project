{"import { User } from './user';

interface UsersState {
  users: User[];
}

export const users = (state: UsersState = { users: [] }, action: any) => {
  switch (action.type) {
    case 'ADD_USER':
      return { users: [...state.users, action.user] };
    case 'REMOVE_USER':
      return { users: state.users.filter((user) => user.id !== action.userId) };
    default:
      return state;
  }
};

export const addUser = (user: User) => ({ type: 'ADD_USER', user });
export const removeUser = (userId: string) => ({ type: 'REMOVE_USER', userId });
