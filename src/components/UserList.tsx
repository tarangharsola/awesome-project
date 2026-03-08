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
    const activeUsers = users.filter((user) => user.id !== 'self');
    setActiveUsers(activeUsers);
    setColors(users.reduce((acc, user) => ({ ...acc, [user.id]: user.color }), {}));
  }, [users]);

  return (
    <div className="active-users-panel">
      {activeUsers.map((user) => (
        <div key={user.id} style={{ backgroundColor: colors[user.id] }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;