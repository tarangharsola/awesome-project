{"import { createReducer } from 'redux';

interface State {
  users: { [userId: string]: { color: string } };
}

const initialState: State = {
  users: {} as any,
};

const userReducer = createReducer(initialState, {
  JOIN_ROOM: (state, action) => {
    return {
      ...state,
      users: {
        ...state.users,
        [action.payload.userId]: {
          color: action.payload.color,
        },
      },
    };
  },
  LEAVE_ROOM: (state, action) => {
    return {
      ...state,
      users: {
        ...state.users,
        [action.payload.userId]: null,
      },
    };
  },
});

export default userReducer;