{"import { combineReducers } from 'redux';

const userReducer = combineReducers({
  name: (state = '', action) => {
    switch (action.type) {
      case 'UPDATE_NAME':
        return action.payload;
      default:
        return state;
    }
  },
  color: (state = '', action) => {
    switch (action.type) {
      case 'UPDATE_COLOR':
        return action.payload;
      default:
        return state;
    }
  }
});

export default userReducer;