{"import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import WebSocketProvider from './components/WebSocket';

ReactDOM.render(
  <WebSocketProvider>
    <App />
  </WebSocketProvider>,
  document.getElementById('root')
);
