{"import { createStore } from 'redux';
import { userReducer } from './userReducer';

const usersStore = createStore(userReducer);

export default usersStore;