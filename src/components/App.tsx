{"import React from 'react';
import ReconnectionHandler from './ReconnectionHandler';

const App: React.FC = () => {
  const [connected, setConnected] = React.useState(false);

  const handleReconnect = () => {
    setConnected(true);
  };

  return (
    <div>
      <ReconnectionHandler onReconnect={handleReconnect}>
        {/* Editor and other components */}
      </ReconnectionHandler>
    </div>
  );
};

export default App;