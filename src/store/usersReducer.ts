{"import { UsersState } from './users';

const usersReducer = (state: UsersState, action: any) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.data],
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.data.id),
      };
    default:
      return state;
  }
};

export default usersReducer;