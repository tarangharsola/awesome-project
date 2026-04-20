{"import { createReducer } from 'redux';

interface State {
  users: { id: string; name: string; color: string }[];
}

const initialState: State = {
  users: [],
};

const usersReducer = createReducer(initialState, (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    default:
      return state;
  }
});

export default usersReducer;