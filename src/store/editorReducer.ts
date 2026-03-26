{"import { Reducer } from 'redux';
import { JoinAction, LeaveAction, UpdateAction } from './actions';

const initialState = {
  users: [],
  document: ''
};

const editorReducer: Reducer<any, any> = (state = initialState, action) => {
  switch (action.type) {
    case 'join':
      return {
        ...state,
        users: [...state.users, action.data]
      };
    case 'leave':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.data.id)
      };
    case 'update':
      return {
        ...state,
        document: action.data
      };
    default:
      return state;
  }
};

export default editorReducer;