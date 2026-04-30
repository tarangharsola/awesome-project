{"import { User } from '../types';
import { combineReducers } from 'redux';

const initialState: User = {
  id: '',
  name: '',
  color: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user;
    default:
      return state;
  }
};

export default userReducer;