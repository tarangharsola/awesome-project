import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Editor from './Editor';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Editor} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;