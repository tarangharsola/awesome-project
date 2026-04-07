{"import React from 'react';
import UserListComponent from './UserListComponent';
import WebSocket from './WebSocket';
import useWebSocket from './useWebSocket';

const UserList = () => {
  const { send, receive } = useWebSocket();

  useEffect(() => {
    send({ type: 'JOIN', data: { users: ['user1', 'user2'] } });
  }, []);

  return (
    <div>
      <UserListComponent users={receive.users} />
      <WebSocket receive={receive} />
    </div>
  );
};

export default UserList;