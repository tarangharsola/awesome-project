{"import { combineReducers } from 'redux';
import { user } from './user';

const userReducer = combineReducers({
  user,
});

export default userReducer;