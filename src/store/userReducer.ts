{"import { createReducer } from 'redux';

interface State {
  id: string;
  name: string;
  color: string;
}

const initialState: State = {
  id: '',
  name: '',
  color: '',
};

const userReducer = createReducer(initialState, (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      return state;
  }
});

export default userReducer;