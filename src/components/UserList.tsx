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
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const userColors: { [id: string]: string } = {};
    users.forEach((user) => {
      userColors[user.id] = user.color;
    });
    setColors(Object.values(userColors));
  }, [users]);

  useEffect(() => {
    const activeUsersList = users.filter((user) => user.id === user.id);
    setActiveUsers(activeUsersList);
  }, [users]);

  return (
    <div>
      <h2>Active Users:</h2>
      <ul>
        {activeUsers.map((user, index) => (
          <li key={user.id} style={{
            backgroundColor: colors[index],
            color: 'white',
            padding: '5px',
            borderRadius: '5px',
            display: 'inline-block',
            margin: '5px',
          }}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;