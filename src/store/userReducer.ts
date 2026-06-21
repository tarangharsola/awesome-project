{"import { createReducer } from 'redux';

interface UserState {
  users: { [name: string]: { color: string } }
}

const userReducer = createReducer<UserState>({}, {
  ADD_USER: (state, action) => ({ users: { ...state.users, [action.payload.name]: action.payload.user } }),
  REMOVE_USER: (state, action) => ({ users: { ...state.users, [action.payload.name]: undefined } })
});

export default userReducer;