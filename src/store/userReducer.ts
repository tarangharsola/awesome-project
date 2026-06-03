{"import { createReducer } from 'redux';
import { User } from './types';

const userReducer = createReducer(
  (state = [], action) => {
    switch (action.type) {
      case 'JOIN':
        return [...state, action.user];
      case 'LEAVE':
        return state.filter((user) => user.id !== action.userId);
      default:
        return state;
    }
  }
);

export default userReducer;