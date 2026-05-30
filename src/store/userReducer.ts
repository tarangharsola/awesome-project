{"import { createReducer } from 'redux';
import { USER_JOINED, USER_LEFT } from './actions';

const initialState = [];

const userReducer = createReducer(initialState, {
  [USER_JOINED]: (state, action) => {
    return [...state, action.user];
  },
  [USER_LEFT]: (state, action) => {
    return state.filter((user) => user.id !== action.userId);
  },
});

export default userReducer;