// User reducer
import { createReducer } from '@reduxjs/toolkit';
import { addUser, removeUser } from './userActions';
const initialState = [];
const userReducer = createReducer(initialState, {
  [addUser.type]: (state, action) => [...state, action.payload],
  [removeUser.type]: (state, action) => state.filter((user) => user.id !== action.payload),
});
export default userReducer;