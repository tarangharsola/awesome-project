{"import { createReducer } from 'redux';
import { USER_JOINED, USER_LEFT } from './actions';

const initialState = {
  users: [],
};

const userReducer = createReducer(initialState, {
  [USER_JOINED]: (state, action) => ({
    ...state,
    users: [...state.users, action.user],
  }),
  [USER_LEFT]: (state, action) => ({
    ...state,
    users: state.users.filter((user) => user.id !== action.userId),
  }),
});

export default userReducer;