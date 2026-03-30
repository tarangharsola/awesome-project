{"import React from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

const Editor = () => {
  const { value, onChange } = useEditor();
  const { connection } = useWebSocket();
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <textarea style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        padding: 10,
        fontSize: 14,
        fontFamily: 'monospace',
      }}
        value={value}
        onChange={onChange}
      />
      <CursorTracker cursor={connection.cursor} />
      <UserList />
    </div>
  );
}

export default Editor;