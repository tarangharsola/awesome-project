import { createReducer } from '@reduxjs/toolkit';
import { UserAction } from './userActions';

const initialState = {
  users: [],
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(UserAction.addUser, (state, action) => {
      return { ...state, users: [...state.users, action.payload] };
    })
    .addCase(UserAction.removeUser, (state, action) => {
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    });
});

export default userReducer;