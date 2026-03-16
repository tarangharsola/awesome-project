{"import { createReducer } from 'redux';
import { USER_JOIN, USER_LEAVE } from './userActions';

const initialState = [];

const userReducer = createReducer(initialState, {
  [USER_JOIN]: (state, { username, color }) => [...state, { username, color }],
  [USER_LEAVE]: (state, { username }) => state.filter(({ username: u }) => u !== username)
});

export default userReducer;