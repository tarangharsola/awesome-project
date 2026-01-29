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
    const userColors: { [key: string]: string } = {};
    users.forEach((user) => {
      userColors[user.id] = user.color;
    });
    setColors(userColors);
  }, [users]);

  const handleUserUpdate = (user: User) => {
    setActiveUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      const index = updatedUsers.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        updatedUsers[index] = user;
      } else {
        updatedUsers.push(user);
      }
      return updatedUsers;
    });
 );

  return (
    <div className="active-users-panel">
      {activeUsers.map((user) => (
        <div key={user.id} style={{
          backgroundColor: colors[user.id],
          color: 'white',
          padding: '5px',
          borderRadius: '5px',
          marginRight: '10px',
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;