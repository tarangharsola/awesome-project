import { addUser, removeUser } from './actions';

const initialState = [];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.user];
    case 'REMOVE_USER':
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
};

export default userReducer;