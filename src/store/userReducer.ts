{"import { createReducer } from 'redux';
import { USER_JOINED, USER_LEFT } from './actions';

const userReducer = createReducer(
  {},
  {
    [USER_JOINED]: (state, action) => ({ ...state, [action.userId]: action.user }),
    [USER_LEFT]: (state, action) => ({ ...state, [action.userId]: null }),
  }
);

export default userReducer;