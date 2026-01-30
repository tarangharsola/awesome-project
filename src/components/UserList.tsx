{"import React, { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

interface Props {
  users: string[];
}

const UserList = ({ users }: Props) => {
  const [userList, setUserList] = useState(users);
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      setUserList(JSON.parse(event.data));
    };
    return () => {
      ws.close();
    };
  }, []);
  return <ul>
    {userList.map((user, index) => <li key={index}>{user}</li>)}
  </ul>;
};

export default UserList;