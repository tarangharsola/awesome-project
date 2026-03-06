{"import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Room from './Room';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Room} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;