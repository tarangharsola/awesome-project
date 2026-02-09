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
    <div className="active-users-panel">
      {activeUsers.map((user) => (
        <div key={user.id} style={{ backgroundColor: user.color, padding: 10, borderRadius: 5, marginBottom: 10 }}>
          <span style={{ color: 'white' }}>{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;