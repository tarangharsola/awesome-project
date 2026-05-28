{"import { createReducer } from 'redux';
import { USER_CONNECTED, USER_DISCONNECTED } from './actions';

const userReducer = createReducer(
  {},
  {
    [USER_CONNECTED]: (state, action) => ({
      ...state,
      users: [...state.users, action.payload],
    }),
    [USER_DISCONNECTED]: (state, action) => ({
      ...state,
      users: state.users.filter((user) => user.id !== action.payload),
    }),
  }
);

export default userReducer;