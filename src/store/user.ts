{"import { createAction, createReducer } from 'redux-actions';

const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';

const addUser = createAction(ADD_USER);
const removeUser = createAction(REMOVE_USER);

const initialState = [];

const userReducer = createReducer(initialState, {
  [ADD_USER]: (state, action) => [...state, action.payload],
  [REMOVE_USER]: (state, action) => state.filter((user) => user.id !== action.payload.id),
});

export default userReducer;