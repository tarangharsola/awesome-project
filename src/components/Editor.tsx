{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import { useWebSocket } from '../utils/useWebSocket';
import { useUsers } from '../utils/useUsers';
import { useCursor } from '../utils/useCursor';

interface Props {
  language: string;
  document: string;
}

const Editor = ({ language, document }: Props) => {
  const [value, setValue] = useState(document);
  const { send } = useWebSocket();
  const { users } = useUsers();
  const { cursor } = useCursor();

  useEffect(() => {
    send({ type: 'update', data: value });
  }, [value]);

  return (
    <div style={{
      padding: 10,
      border: '1px solid #ccc',
      width: '100%',
      height: '100vh',
    }}>
      <pre style={{
        padding: 10,
        fontSize: 12,
        backgroundColor: '#f0f0f0',
      }}>{
        value
      }</pre>
      <CursorTracker cursor={cursor} />
    </div>
  );
}

export default Editor;