{"import React from 'react';
import ReconnectionHandler from './ReconnectionHandler';

const App: React.FC = () => {
  return (
    <div>
      <ReconnectionHandler onReconnect={() => console.log('Reconnected!')}>Hello World!</ReconnectionHandler>
    </div>
  );
};

export default App;