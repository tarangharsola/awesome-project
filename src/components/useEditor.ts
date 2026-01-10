{"import { useState, useEffect } from 'react';

interface useEditorOptions {
  initialText: string;
  onChanges: (changes: any[]) => void;
  onReconnect: () => void;
}

const useEditor = ({ initialText, onChanges, onReconnect }: useEditorOptions) => {
  const [text, setText] = useState(initialText);
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [cursor, setCursor] = useState({ position: 0, text: '' });
  const [operations, setOperations] = useState([]);
  const [reconnect, setReconnect] = useState(onReconnect);

  useEffect(() => {
    const handleChanges = (changes: any[]) => {
      onChanges(changes);
      setText(changes.reduce((acc, change) => acc + change.text, ''));
    };
    const handleUserJoin = (user: any) => {
      setUsers([...users, user]);
    };
    const handleUserLeave = (user: any) => {
      setUsers(users.filter(u => u !== user));
    };
    const handleCursorUpdate = (cursor: any) => {
      setCursor(cursor);
    };
    const handleOperation = (operation: any) => {
      setOperations([...operations, operation]);
    };
    const handleReconnect = () => {
      onReconnect();
    };
    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'changes':
          handleChanges(data.changes);
          break;
        case 'user_join':
          handleUserJoin(data.user);
          break;
        case 'user_leave':
          handleUserLeave(data.user);
          break;
        case 'cursor_update':
          handleCursorUpdate(data.cursor);
          break;
        case 'operation':
          handleOperation(data.operation);
          break;
        case 'reconnect':
          handleReconnect();
          break;
        case 'disconnect':
          handleDisconnect();
          break;
      }
    };
    ws.onopen = () => {
      setIsConnected(true);
    };
    ws.onclose = () => {
      setIsConnected(false);
    };
    return () => ws.close();
  }, []);
  return {
    text,
    users,
    isConnected,
    cursor,
    operations,
    reconnect,
  };
};

export default useEditor;