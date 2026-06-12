{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';
import { useUsers } from './useUsers';
import { useCursor } from './useCursor';

const Editor = () => {
  const { ws, connected } = useWebSocket();
  const users = useUsers();
  const cursor = useCursor();

  useEffect(() => {
    if (connected) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'cursor') {
          cursor.update(data.cursor);
        } else if (data.type === 'users') {
          users.update(data.users);
        }
      };
    }
  }, [connected, ws, cursor, users]);

  return (
    <div>
      <h1>Editor</h1>
      <div className='editor'>
        <pre>{cursor.code}</pre>
      </div>
      <div className='users'>
        {users.map((user) => (
          <div key={user.id} style={{
            backgroundColor: user.color,
            padding: '5px',
            borderRadius: '5px',
            display: 'inline-block',
            marginRight: '10px'
          }}>
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Editor;