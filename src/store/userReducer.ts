{"import { User } from './User';

const initialState = new User();

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return action.user;
    default:
      return state;
  }
};

export default userReducer;