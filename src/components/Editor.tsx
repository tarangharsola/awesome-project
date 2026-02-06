{"import React, { useState, useEffect } from 'react';
import ReconnectionHandler from './ReconnectionHandler';

const Editor = () => {
  const [code, setCode] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('');

  useEffect(() => {
    // Simulate connection status
    const isConnected = Math.random() > 0.5;
    setConnectionStatus(isConnected ? 'Connected' : 'Disconnected');
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  return (
    <div>
      <ReconnectionHandler connectionStatus={connectionStatus} />
      <textarea value={code} onChange={(e) => handleCodeChange(e.target.value)} />
    </div>
  );
};
export default Editor;