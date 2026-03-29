{"import { createReducer } from 'redux';
import { USER_JOIN, USER_LEAVE } from './actions';

const initialState = [];

const userReducer = createReducer(initialState, {
  [USER_JOIN]: (state, action) => [...state, action.user],
  [USER_LEAVE]: (state, action) => state.filter((user) => user.username !== action.user.username),
});

export default userReducer;