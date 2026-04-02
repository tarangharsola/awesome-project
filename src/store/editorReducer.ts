{"import { Reducer } from 'redux';
import { UPDATE_EDITOR_STATE } from './actions';

const editorReducer: Reducer<string, Action> = (state = '', action) => {
  switch (action.type) {
    case UPDATE_EDITOR_STATE:
      return action.payload;
    default:
      return state;
  }
};

export default editorReducer;