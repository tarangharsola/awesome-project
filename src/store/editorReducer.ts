{"import { Reducer } from 'redux';
import { setCursor } from './actions';

const editorReducer: Reducer<{ cursor: { x: number; y: number }; }, any> = (state = { cursor: { x: 0, y: 0 } }, action) => {
  switch (action.type) {
    case 'SET_CURSOR':
      return { ...state, cursor: action.cursor };
    default:
      return state;
  }
};

export default editorReducer;