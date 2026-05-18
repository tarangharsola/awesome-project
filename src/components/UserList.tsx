{"import React from 'react';
import { useState, useEffect } from 'react';
import { User } from './User';

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  const [activeUsers, setActiveUsers] = useState(users);

  useEffect(() => {
    setActiveUsers(users);
  }, [users]);

  return (
    <div className="user-list">
      {activeUsers.map((user, index) => (
        <User key={index} user={user} />
      ))}
    </div>
  );
};

export default UserList;