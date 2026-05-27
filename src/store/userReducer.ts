{"import { combineReducers } from 'redux';
import { User } from './user';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.user];
    case 'REMOVE_USER':
      return state.filter((user) => user.id !== action.userId);
    default:
      return state;
  }
};

export default userReducer;