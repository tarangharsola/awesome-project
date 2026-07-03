{"import { combineReducers } from 'redux';

interface UserState {
  id: string;
  name: string;
  color: string;
}

interface UsersState {
  users: UserState[];
}

const usersReducer = combineReducers<UsersState>({ users: () => ({}) });

export default usersReducer;