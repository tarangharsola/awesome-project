{"import { User } from '../types';
import { combineReducers } from 'redux';

const initialState: User = {
  name: '',
  color: '',
  cursorPosition: 0
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userReducer;