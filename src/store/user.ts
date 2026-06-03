{"import { User } from './user';

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: null
};

export { initialState, UserState };

export type { User } from './user';