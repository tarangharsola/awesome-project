{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import { useWebSocket } from '../utils/useWebSocket';

const Editor = () => {
  const [code, setCode] = useState('');
  const { send, receive } = useWebSocket();
  const { cursor } = useEditor();

  useEffect(() => {
    receive((message) => {
      setCode(message.code);
    });
  }, []);

  const handleSendMessage = () => {
    send({ type: 'update', code });
  };

  return (
    <div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={handleSendMessage}>Send</button>
      <CursorTracker />
    </div>
  );
};

export default Editor;