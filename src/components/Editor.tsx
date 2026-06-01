{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import { useWebSocket } from '../utils/useWebSocket';
import CursorTracker from './CursorTracker';

interface Props {
  language: string;
  value: string;
}

const Editor: React.FC<Props> = ({ language, value }) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [users, setUsers] = useState([]);
  const { send, receive } = useWebSocket();
  const { value: editorValue, setValue } = useEditor();

  useEffect(() => {
    receive((message) => {
      if (message.type === 'cursor') {
        setCursor(message.cursor);
      } else if (message.type === 'users') {
        setUsers(message.users);
      }
    });
  }, []);

  const handleCursorChange = (cursor: { x: number; y: number }) => {
    send({ type: 'cursor', cursor });
  };

  const handleUserChange = (users: { id: string; name: string; color: string }[]) => {
    setUsers(users);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        padding: 10
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'auto'
        }}>
          <div style={{
            position: 'absolute',
            left: cursor.x,
            top: cursor.y,
            width: 2,
            height: 20,
            backgroundColor: 'red'
          }}/>
          <div style={{
            position: 'absolute',
            left: 10,
            top: 10,
            width: 200,
            height: 20,
            backgroundColor: 'blue'
          }}>
            {users.map((user) => (
              <div key={user.id} style={{
                position: 'absolute',
                left: 10,
                top: 30 + user.id * 20,
                width: 200,
                height: 20,
                backgroundColor: user.color
              }}>{user.name}</div>
            ))}
          </div>
        </div>
      </div>
      <CursorTracker cursor={cursor} user={users[0] || { id: '', name: '', color: '' }}/>
      <div style={{
        position: 'absolute',
        left: 10,
        top: 10,
        width: 200,
        height: 20,
        backgroundColor: 'green'
      }}>{editorValue}</div>
    </div>
  );
}

export default Editor;