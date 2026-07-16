{"import { createReducer } from 'redux';
import { UPDATE_USERS } from './actions';

const initialState = [];

const userReducer = createReducer(initialState, {
  [UPDATE_USERS]: (state, action) => action.users,
});

export default userReducer;