import { createReducer } from '@reduxjs/toolkit';
import { UserActions } from './userActions';

const initialState = {
  users: [],
  currentUser: null,
};

const userReducer = createReducer(initialState, {
  [UserActions.addUser]: (state, action) => ({ ...state, users: [...state.users, action.payload] }),
  [UserActions.removeUser]: (state, action) => ({ ...state, users: state.users.filter((user) => user.id !== action.payload.id) }),
  [UserActions.setCurrentUser]: (state, action) => ({ ...state, currentUser: action.payload }),
});

export default userReducer;