{"import { Reducer } from 'redux';

const userReducer: Reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;