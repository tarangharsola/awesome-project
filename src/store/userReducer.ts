import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('UPDATE_USERS', (state, action) => ({ ...state, users: action.payload }));
});

export default userReducer;