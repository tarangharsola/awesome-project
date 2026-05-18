{"import { createReducer } from 'redux';

const userReducer = createReducer(
  {
    users: [],
  },
  {
    USERS: (state, action) => ({ ...state, users: action.payload }),
  }
);

export default userReducer;