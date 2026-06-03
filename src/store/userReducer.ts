{"import { createReducer } from 'redux';
import { USERS_STATE } from './types';

const initialState = [];

const userReducer = createReducer(initialState, {
  [USERS_STATE]: (state, action) => {
    return [...state, ...action.users];
  }
});

export default userReducer;