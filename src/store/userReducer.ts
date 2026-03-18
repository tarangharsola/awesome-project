{"import { createReducer } from 'redux';
import { USER_JOINED, USER_LEFT } from './userActions';

const initialState = {
  users: [],
};

const userReducer = createReducer(initialState, {
  [USER_JOINED]: (state, { user }) => ({ ...state, users: [...state.users, user] }),
  [USER_LEFT]: (state, { user }) => ({ ...state, users: state.users.filter((u) => u.id !== user.id) }),
});

export default userReducer;