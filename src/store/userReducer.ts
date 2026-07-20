{"import { createReducer } from 'redux';
import { USERS_CHANGED } from './actions';

const initialState = [];

const userReducer = createReducer(initialState, {
  [USERS_CHANGED]: (state, action) => action.payload,
});

export default userReducer;