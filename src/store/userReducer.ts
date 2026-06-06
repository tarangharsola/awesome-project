{"import { combineReducers } from 'redux';

const userReducer = combineReducers({
  user: (state = '', action) => {
    switch (action.type) {
      case 'UPDATE_USER':
        return action.payload;
      default:
        return state;
    }
  },
  users: (state = [], action) => {
    switch (action.type) {
      case 'UPDATE_USERS':
        return action.payload;
      default:
        return state;
    }
  }
});

export default userReducer;