{"import { createReducer, on } from 'redux';
import { USER_JOIN, USER_LEAVE } from './actions';

const initialState = [];

const userReducer = createReducer(initialState, {
  [USER_JOIN]: (state, { user }) => [...state, user],
  [USER_LEAVE]: (state, { user }) => state.filter((u) => u.id !== user.id)
});

export default userReducer;