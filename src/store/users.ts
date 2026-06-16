{"import { createStore, applyMiddleware } from 'redux';
import { usersReducer } from './usersReducer';
import { WebSocket } from 'ws';

const store = createStore(usersReducer, applyMiddleware(WebSocket));

export default store;