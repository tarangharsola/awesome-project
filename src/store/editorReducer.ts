{"import { createReducer } from 'redux';
import { UPDATE_CODE } from './actions';

const editorReducer = createReducer(
  {
    code: '',
  },
  {
    [UPDATE_CODE]: (state, action) => ({
      code: action.code,
    }),
  }
);

export default editorReducer;