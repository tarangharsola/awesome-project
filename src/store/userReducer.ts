{"import { createReducer } from 'redux';
import { USERS_UPDATED } from './actions';

const initialState = [];

const userReducer = createReducer(initialState, {
  [USERS_UPDATED]: (state, action) => action.users,
});

export default userReducer;