{"import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

const initialState = fromJS({ users: [] });

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USERS':
      return state.set('users', action.data);
    default:
      return state;
  }
};

export default userReducer;