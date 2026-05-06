{"import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './userReducer';
import userReducer from './usersReducer';
import { WebSocketMiddleware } from './WebSocketMiddleware';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(WsMiddleware)));

export default store;