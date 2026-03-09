{"import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Editor from './Editor';
import Room from './Room';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Editor} />
        <Route path="/room/:roomId" component={Room} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;