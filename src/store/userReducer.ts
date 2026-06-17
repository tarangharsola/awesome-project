import { createReducer } from '@reduxjs/toolkit';
import { UserAction } from './userActions';

const userReducer = createReducer({
  username: '',
  color: '#ff0000'
}, {
  [UserAction.setUsername]: (state, action) => ({ ...state, username: action.payload }),
  [UserAction.setColor]: (state, action) => ({ ...state, color: action.payload })
});

export default userReducer;