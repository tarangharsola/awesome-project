{"import { User } from '../types';
import { combineReducers } from 'redux';

const initialState: User[] = [];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.payload];
    case 'REMOVE_USER':
      return state.filter(user => user.name !== action.payload.name);
    default:
      return state;
  }
};

export default usersReducer;