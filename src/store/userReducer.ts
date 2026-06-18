{"import { createReducer } from 'redux';

const initialState = [];

const userReducer = createReducer(initialState, {
  UPDATE_USERS: (state, action) => {
    return action.users;
  }
});

export default userReducer;