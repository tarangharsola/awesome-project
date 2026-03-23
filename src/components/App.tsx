import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Editor from './Editor';
import UserList from './UserList';
import Room from './Room';
import LanguageSelector from './LanguageSelector';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Editor} />
        <Route path="/users" component={UserList} />
        <Route path="/rooms/:roomId" component={Room} />
        <Route path="/languages" component={LanguageSelector} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;