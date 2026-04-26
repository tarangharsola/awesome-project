{"import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

const initialState = fromJS({ users: [] });

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return state.update('users', (users) => users.push(action.user));
    case 'REMOVE_USER':
      return state.update('users', (users) => users.filter((user) => user.get('username') !== action.username));
    default:
      return state;
  }
};

export default usersReducer;