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

const UserList: React.FC<Props> = ({ users }) => {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);

  useEffect(() => {
    setActiveUsers(users);
  }, [users]);

  return (
    <div className="active-users">
      {activeUsers.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
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