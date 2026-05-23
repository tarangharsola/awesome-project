{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import { useWebSocket } from '../utils/useWebSocket';
import CursorTracker from './CursorTracker';

interface Props {
  documentId: string;
}

const Editor: React.FC<Props> = ({ documentId }) => {
  const [document, setDocument] = useState('');
  const [users, setUsers] = useState([]);
  const { send, receive } = useWebSocket(documentId);
  const { cursor } = useEditor(document);

  useEffect(() => {
    receive((message) => {
      setDocument(message.document);
      setUsers(message.users);
    });
  }, []);

  const handleSendMessage = (message) => {
    send(message);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
    }}>
      <CursorTracker cursor={cursor} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: '#f0f0f0',
        overflow: 'auto',
      }}>
        <pre style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}>{document}</pre>
      </div>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: 10,
        backgroundColor: '#f0f0f0',
      }}>
        <h2>Users:</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Editor;