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
    const activeUsers = users.filter((user) => user.id !== 'self');
    setActiveUsers(activeUsers);
    const colors = users.reduce((acc, user) => ({ ...acc, [user.id]: user.color }), {});
    setColors(colors);
  }, [users]);

  return (
    <div className="user-list">
      {activeUsers.map((user) => (
        <div key={user.id} style={{ backgroundColor: colors[user.id] }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;