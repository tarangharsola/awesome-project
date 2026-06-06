{"import { combineReducers } from 'redux';

const usersReducer = combineReducers({
  users: (state = [], action) => {
    switch (action.type) {
      case 'UPDATE_USERS':
        return action.payload;
      default:
        return state;
    }
  }
});

export default usersReducer;