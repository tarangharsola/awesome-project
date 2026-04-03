{"import React from 'react';
import ReconnectionHandler from './ReconnectionHandler';

const App: React.FC = () => {
  return (
    <div>
      <ReconnectionHandler onReconnect={() => console.log('Reconnected!')}>\n        <h1>Collaborative Code Editor</h1>
      </ReconnectionHandler>
    </div>
  );
};

export default App;