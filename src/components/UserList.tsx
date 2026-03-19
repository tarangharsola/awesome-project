{"import React from 'react';
import UserListComponent from './UserListComponent';
import WebSocket from './WebSocket';
import useWebSocket from './useWebSocket';

const UserList = () => {
  const { send, receive } = useWebSocket();

  useEffect(() => {
    send({ type: 'JOIN', data: { username: 'John Doe' } });
  }, []);

  return (
    <div>
      <UserListComponent />
      <WebSocket send={send} receive={receive} />
    </div>
  );
};

export default UserList;