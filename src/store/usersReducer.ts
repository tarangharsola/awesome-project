{"import { handleActions } from 'redux-actions';
import { ADD_USER, REMOVE_USER } from './actions';

const usersReducer = handleActions({
  [ADD_USER]: (state, { payload: user }) => [...state, user],
  [REMOVE_USER]: (state, { payload: userId }) => state.filter((user) => user.id !== userId),
}, []);

export default usersReducer;