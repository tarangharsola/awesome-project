{"import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';

const App = () => {
  return (
    <Provider store={store}>
      <Room />
    </Provider>
  );
};

export default App;