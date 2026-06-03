{"import { User } from './user';

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: []
};

export { initialState, UsersState };

export type { User } from './user';