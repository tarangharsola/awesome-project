{"import { createStore } from 'redux';

interface UserState {
  id: string;
  name: string;
  color: string;
}

interface UsersState {
  users: UserState[];
}

const usersReducer = (state: UsersState = { users: [] }, action: any) => {
  switch (action.type) {
    case 'ADD_USER':
      return { users: [...state.users, action.payload] };
    case 'REMOVE_USER':
      return { users: state.users.filter((user) => user.id !== action.payload.id) };
    default:
      return state;
  }
}

const store = createStore(usersReducer);

export default store;