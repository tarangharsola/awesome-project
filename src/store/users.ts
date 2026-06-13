import { Action } from 'redux';
import { User } from './user';

interface UsersState {
   users: User[];
}

const initialState: UsersState = {
   users: [],
};

const users = (state = initialState, action: Action) => {
   switch (action.type) {
      case 'JOIN':
         return { ...state, users: [...state.users, action.payload] };
      case 'LEAVE':
         return { ...state, users: state.users.filter((u) => u !== action.payload) };
      default:
         return state;
   }
};

export { users, initialState };