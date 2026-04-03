import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/index';
import Room from './Room';
import UserList from './UserList';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Room} />
          <Route path='/users' component={UserList} />
          <Route path='/editor' component={Editor} />
          <Route path='/language-selector' component={LanguageSelector} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;