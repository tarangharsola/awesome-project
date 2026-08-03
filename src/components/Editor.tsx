{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import { useWebSocket } from '../utils/useWebSocket';
import CursorTracker from './CursorTracker';

interface Props {
  language: string;
}

const Editor: React.FC<Props> = ({ language }) => {
  const [code, setCode] = useState('');
  const { send, receive } = useWebSocket();
  const { cursor, users } = useEditor(code, language);

  useEffect(() => {
    receive((message) => {
      if (message.type === 'update') {
        setCode(message.code);
      }
    });
  }, []);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    send({ type: 'update', code: newCode });
 );

  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <CursorTracker cursor={cursor} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        padding: 10,
        fontSize: 14,
        fontFamily: 'monospace',
        overflow: 'auto',
      }}>
        {code.split('
').map((line, index) => (
          <div key={index} style={{
            marginBottom: 2,
          }}>{line}</div>
        ))}
      </div>
    </div>
  );
}

export default Editor;