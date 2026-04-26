{"import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

const initialState = fromJS({ username: '', color: '' });

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return state.set('username', action.username);
    case 'SET_COLOR':
      return state.set('color', action.color);
    default:
      return state;
  }
};

export default userReducer;