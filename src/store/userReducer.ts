{"import { createReducer } from 'redux';
import { ADD_USER, REMOVE_USER } from './userActions';

const initialState = [];

const userReducer = createReducer(initialState, {
  [ADD_USER]: (state, action) => [...state, action.user],
  [REMOVE_USER]: (state, action) => state.filter((user) => user.id !== action.userId),
});

export default userReducer;