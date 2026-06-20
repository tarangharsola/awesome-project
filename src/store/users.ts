{"interface User {
  id: string;
  name: string;
  color: string;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

export default initialState;