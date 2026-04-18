{"import { Reducer } from 'redux';

const usersReducer: Reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.payload];
    case 'REMOVE_USER':
      return state.filter((user) => user.id !== action.payload.id);
    default:
      return state;
  }
};

export default usersReducer;