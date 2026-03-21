{"import { Reducer } from 'redux';
import { Action } from './actions';

const initialState = {
  value: '',
  cursor: { x: 0, y: 0 },
};

const editorReducer: Reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return {
        ...state,
        value: action.value,
      };
    case 'UPDATE_CURSOR':
      return {
        ...state,
        cursor: action.cursor,
      };
    default:
      return state;
  }
};

export default editorReducer;