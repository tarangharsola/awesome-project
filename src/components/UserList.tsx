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
    setActiveUsers(users);
  }, [users]);

  return (
    <div className="active-users-panel">
      {activeUsers.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
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