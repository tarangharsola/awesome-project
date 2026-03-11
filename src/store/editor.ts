{"import { createAction, createReducer } from 'redux-actions';

const ADD_CODE = 'ADD_CODE';
const REMOVE_CODE = 'REMOVE_CODE';

const addCode = createAction(ADD_CODE);
const removeCode = createAction(REMOVE_CODE);

const initialState = '';

const editorReducer = createReducer(initialState, {
  [ADD_CODE]: (state, action) => state + action.payload,
  [REMOVE_CODE]: (state, action) => state.replace(action.payload, ''),
});

export default editorReducer;