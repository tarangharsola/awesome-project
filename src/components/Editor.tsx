{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import { useWebSocket } from '../utils/useWebSocket';

const Editor = () => {
  const [code, setCode] = useState('');
  const { sendCode, receiveCode } = useEditor();
  const { connect, disconnect, send, receive } = useWebSocket();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
    sendCode(event.target.value);
  };

  return (
    <div>
      <textarea value={code} onChange={handleCodeChange} />
      <div>{receiveCode}</div>
    </div>
  );
};

export default Editor;