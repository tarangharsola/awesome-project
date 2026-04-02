{"import { createStore, combineReducers } from 'redux';
import editorReducer from './editorReducer';

const rootReducer = combineReducers({
  editor: editorReducer,
});

const store = createStore(rootReducer);

export default store;