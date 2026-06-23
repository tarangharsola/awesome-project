{"import { createReducer } from 'redux';
import { JOIN, LEAVE } from './actions';

const userReducer = createReducer(
  {
    users: [],
  },
  {
    [JOIN]: (state, action) => ({
      users: [...state.users, action.user],
    }),
    [LEAVE]: (state, action) => ({
      users: state.users.filter((user) => user.id !== action.userId),
    }),
  }
);

export default userReducer;