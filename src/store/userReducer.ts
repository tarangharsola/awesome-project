{"import { User } from './user';
import { Reducer } from 'redux';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userReducer: Reducer<UserState> = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'REMOVE_USER':
      return initialState;
    default:
      return state;
  }
};

export default userReducer;