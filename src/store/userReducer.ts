{"import { combineReducers } from 'redux';

const userReducer = combineReducers({
  users: (state = [], action) => {
    switch (action.type) {
      case 'ADD_USER':
        return [...state, action.user];
      case 'REMOVE_USER':
        return state.filter((user) => user.id !== action.userId);
      default:
        return state;
    }
  }
});

export default userReducer;