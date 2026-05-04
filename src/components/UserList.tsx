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

  useEffect(() => {
    const activeUsers = users.filter((user) => user.isActive);
    setActiveUsers(activeUsers);
  }, [users]);

  return (
    <div>
      {activeUsers.map((user) => (
        <div key={user.id} style={{
          backgroundColor: user.color,
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