{"import { createReducer } from 'redux';
import { UsersAction } from './actions';

const initialState: UsersState = [];

const usersReducer = createReducer(initialState, {
  [UsersAction.addUser]: (state, action) => [...state, action.user],
  [UsersAction.removeUser]: (state, action) => state.filter(user => user.username !== action.username)
});

export default usersReducer;