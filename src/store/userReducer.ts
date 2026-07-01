{"import { createReducer } from 'redux';
import { UserAction } from './types';

const userReducer = createReducer(
  {},
  {
    [UserAction.JOIN]: (state, action) => ({ users: [...state.users, action.payload] }),
    [UserAction.LEAVE]: (state, action) => ({ users: state.users.filter((user) => user !== action.payload) }),
  }
);

export default userReducer;