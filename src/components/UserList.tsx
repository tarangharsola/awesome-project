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
  const [colors, setColors] = useState({} as { [id: string]: string });

  useEffect(() => {
    const userColors: { [id: string]: string } = {};
    users.forEach((user) => {
      userColors[user.id] = user.color;
    });
    setColors(userColors);
  }, [users]);

  const handleUserUpdate = (updatedUser: User) => {
    setActiveUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) => {
        if (user.id === updatedUser.id) {
          return updatedUser;
        }
        return user;
      });
      return updatedUsers;
    });
  }

  return (
    <div>
      {activeUsers.map((user) => (
        <div key={user.id} style={{
          backgroundColor: colors[user.id],
          padding: '5px',
          borderRadius: '5px',
          marginRight: '10px',
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default UserList;