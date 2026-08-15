{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import { useWebSocket } from '../utils/useWebSocket';

interface Props {
  roomId: string;
}

const Editor: React.FC<Props> = ({ roomId }) => {
  const [code, setCode] = useState('');
  const { sendCode, receiveCode } = useWebSocket(roomId);
  const { cursorPositions } = useEditor(roomId);

  useEffect(() => {
    receiveCode((code) => setCode(code));
  }, []);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    sendCode(newCode);
  };

  return (
    <div style={{
      position: 'relative',
      height: 400,
      overflow: 'auto',
    }}>
      <pre style={{
        padding: 10,
        fontSize: 12,
      }}>{code}</pre>
      {cursorPositions.map((position, index) => (
        <CursorTracker key={index} userId={position.userId} cursorPosition={position.cursorPosition} />
      ))}
    </div>
  );
}

export default Editor;