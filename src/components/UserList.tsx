{"import React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../useUsers';

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
  const { users: allUsers, addColor } = useUsers();

  useEffect(() => {
    const activeUsers = users.filter((user) => user.id !== 'self');
    setActiveUsers(activeUsers);
  }, [users]);

  return (
    <div className="active-users">
      {activeUsers.map((user) => (
        <div key={user.id} style={{
          backgroundColor: user.color,
          color: 'white',
          padding: '5px',
          borderRadius: '5px',
          display: 'inline-block',
          marginRight: '10px',
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;