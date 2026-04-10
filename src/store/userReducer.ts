{"import { createReducer } from 'redux';
import { UserAction } from './actions';

const initialState: UserState = {
  username: '',
  color: '',
  connected: false
};

const userReducer = createReducer(initialState, {
  [UserAction.setUsername]: (state, action) => ({ ...state, username: action.username }),
  [UserAction.setColor]: (state, action) => ({ ...state, color: action.color }),
  [UserAction.setConnected]: (state, action) => ({ ...state, connected: action.connected })
});

export default userReducer;