{"import React from 'react';
import { useState, useEffect } from 'react';
import { User } from '../types';

interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [colors, setColors] = useState({});

  useEffect(() => {
    const userColors = users.reduce((acc, user) => {
      acc[user.id] = `#${Math.floor(Math.random() * 16777215).toString(16)});
      return acc;
    }, {});
    setColors(userColors);
  }, [users]);

  useEffect(() => {
    const activeUsersList = users.filter(user => user.isActive);
    setActiveUsers(activeUsersList);
  }, [users]);

  return (
    <div className="active-users">
      {activeUsers.map(user => (
        <div key={user.id} style={{
          backgroundColor: colors[user.id],
          color: 'white',
          padding: '5px',
          borderRadius: '5px',
          display: 'inline-block',
          margin: '5px'
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;