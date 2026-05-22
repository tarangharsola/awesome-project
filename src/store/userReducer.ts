{"import { combineReducers } from 'redux';
import { User } from './user';

const userReducer = combineReducers({
  users: (state = [], action) => {
    switch (action.type) {
      case 'ADD_USER':
        return [...state, action.payload];
      case 'REMOVE_USER':
        return state.filter((user) => user.id !== action.payload.id);
      default:
        return state;
    }
  },
});

export default userReducer;