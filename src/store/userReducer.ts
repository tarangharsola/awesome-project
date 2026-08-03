{"import { createReducer } from 'redux';

interface State {
  users: { name: string; color: string; }[];
}

const userReducer = createReducer<State>({}, {
  ADD_USER: (state, action) => {
    return { ...state, users: [...state.users, action.user] };
  },
  REMOVE_USER: (state, action) => {
    return { ...state, users: state.users.filter((user) => user.name !== action.user.name) };
  },
});

export default userReducer;