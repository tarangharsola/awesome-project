{"import { Reducer } from 'redux';
import { setUsers } from './actions';

const userReducer: Reducer<{ users: { name: string; color: string }[] }, any> = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.users;
    default:
      return state;
  }
};

export default userReducer;