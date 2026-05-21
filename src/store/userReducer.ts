{"import { User } from './user';
import { Reducer } from 'redux';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userReducer: Reducer<UserState, any> = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;