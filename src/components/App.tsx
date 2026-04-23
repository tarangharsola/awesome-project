{"import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import Room from './components/Room';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Room} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;