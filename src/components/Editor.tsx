{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import { useWebSocket } from '../utils/useWebSocket';

interface Props {
  roomId: string;
  language: string;
}

const Editor: React.FC<Props> = ({ roomId, language }) => {
  const [code, setCode] = useState('');
  const { sendCode, receiveCode } = useEditor(roomId);
  const { connect, disconnect } = useWebSocket(roomId);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    sendCode(newCode);
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      overflow: 'auto',
    }}>
      <textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        style={{
          width: '100%',
          height: '100%',
          padding: 10,
          fontSize: 14,
          fontFamily: 'monospace',
        }}
      />
    </div>
  );
}

export default Editor;