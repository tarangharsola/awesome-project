{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';
import { CursorTracker } from './CursorTracker';

interface Props {
  roomId: string;
  language: string;
}

const Editor: React.FC<Props> = ({ roomId, language }) => {
  const [code, setCode] = useState('');
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const { send } = useWebSocket(roomId);
  const { cursor: remoteCursor } = useCursor(roomId);

  useEffect(() => {
    const handleCursorChange = ({ x, y }) => setCursor({ x, y });
    send({ type: 'cursor', data: { x, y } });
  }, [x, y]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        left: cursor.x,
        top: cursor.y,
        width: 2,
        height: 10,
        backgroundColor: 'black',
        zIndex: 2
      }}/>
      <CursorTracker cursor={cursor} username='me' color='blue'/>
      {remoteCursor && (
        <CursorTracker cursor={remoteCursor} username='other' color='red'/>
      )}
      <textarea value={code} onChange={(e) => setCode(e.target.value)} style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100vh',
        padding: 10,
        fontSize: 14,
        fontFamily: 'monospace'
      }}/>
    </div>
  );
}

export default Editor;