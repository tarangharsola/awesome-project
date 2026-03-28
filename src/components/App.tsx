{"import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import Editor from './components/Editor';

function App() {
  return (
    <Provider store={store}>
      <Editor />
    </Provider>
  );
}

export default App;