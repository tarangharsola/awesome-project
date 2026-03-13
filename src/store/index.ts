{"import { createStore, combineReducers, applyMiddleware } from 'redux';
import { rootReducer } from './editorReducer';
import { rootReducer } from './userReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { socketMiddleware } from './socketMiddleware';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(socketMiddleware))
);

export default store;