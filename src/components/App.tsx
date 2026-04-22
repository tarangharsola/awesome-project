import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/index';
import Editor from './Editor';
import UserList from './UserList';
import WebSocket from './WebSocket';

const App = () => {
   return (
      <Provider store={store}>
         <div className='app'>
            <Editor />
            <UserList />
            <WebSocket />
         </div>
      </Provider>
   );
};

export default App;