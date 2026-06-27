{"import { combineReducers } from 'redux';
import { User } from './user';

const userReducer = combineReducers({
  users: (state = [], action) => {
    switch (action.type) {
      case 'USERS_UPDATED':
        return action.users;
      default:
        return state;
    }
  },
  user: (state = null, action) => {
    switch (action.type) {
      case 'USER_UPDATED':
        return action.user;
      default:
        return state;
    }
  }
});
export default userReducer;