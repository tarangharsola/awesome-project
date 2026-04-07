{"import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Editor from './Editor';
import Room from './Room';
import UserList from './UserList';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/editor" component={Editor} />
        <Route path="/room" component={Room} />
        <Route path="/users" component={UserList} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;