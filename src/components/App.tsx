{"import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Editor from './Editor';

const App = () => {
  return (
    <Provider store={store}>
      <Editor />
    </Provider>
  );
};

export default App;