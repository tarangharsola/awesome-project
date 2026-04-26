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
    const userColors = users.reduce((acc, user) => {
      acc[user.id] = user.color;
      return acc;
    }, {});
    setColors(userColors);
  }, [users]);

  const handleUserUpdate = (user: User) => {
    setActiveUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((u) => {
        if (u.id === user.id) {
          return user;
        }
        return u;
      });
      return updatedUsers;
    });
  }

  return (
    <div className="user-list">
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