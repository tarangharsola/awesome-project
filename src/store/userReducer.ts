{"import { createReducer } from 'redux';
import { User } from './user';

const initialState = [];

const userReducer = createReducer(initialState, {
  USER_ADDED: (state, action) => [...state, action.user],
  USER_REMOVED: (state, action) => state.filter((user) => user.id !== action.userId),
});

export default userReducer;