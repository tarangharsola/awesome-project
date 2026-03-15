{"import { createReducer } from 'redux';
import { USER_STATE } from './userTypes';

const userReducer = createReducer(USER_STATE, {
  [USER_STATE.JOIN]: (state, action) => ({ ...state, users: [...state.users, action.user] }),
  [USER_STATE.LEAVE]: (state, action) => ({ ...state, users: state.users.filter((user) => user.id !== action.userId) }),
});

export default userReducer;