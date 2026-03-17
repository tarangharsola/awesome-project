{"import { createReducer } from 'redux';

interface UserState {
  users: { [key: string]: { name: string; color: string } }
}

const initialState: UserState = {
  users: {}
};

const userReducer = createReducer(initialState, {
  ADD_USER: (state, action) => ({ ...state, users: { ...state.users, [action.payload.userId]: action.payload.user } }),
  REMOVE_USER: (state, action) => ({ ...state, users: { ...state.users, [action.payload.userId]: null } })
});

export default userReducer;