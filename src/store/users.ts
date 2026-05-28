{"import { User } from './user';

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export default initialState;