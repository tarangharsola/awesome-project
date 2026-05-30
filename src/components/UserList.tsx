{"import React from 'react';
import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  color: string;
}

interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [colors, setColors] = useState({});

  useEffect(() => {
    const userColors = users.reduce((acc, user) => ({ ...acc, [user.id]: user.color }), {});
    setColors(userColors);
  }, [users]);

  useEffect(() => {
    const activeUsersList = users.filter((user) => user.id === user.id);
    setActiveUsers(activeUsersList);
  }, [users]);

  return (
    <div>
      {activeUsers.map((user) => (
        <div key={user.id} style={{
          backgroundColor: colors[user.id],
          padding: '5px',
          borderRadius: '5px',
          color: 'white',
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;