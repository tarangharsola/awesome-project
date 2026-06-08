{"import { User } from './user';

interface UserState {
  user: User;
}

export const initialState: UserState = {
  user: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const updateUser = (user: User) => ({ type: 'UPDATE_USER', payload: user });