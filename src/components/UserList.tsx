{"import React from 'react';
import { User } from './User';

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;

interface UserProps {
  user: User;
}

const User = ({ user }: UserProps) => {
  return (
    <div className="user">
      <span className="username">{user.username}</span>
      <span className="color" style={{ backgroundColor: user.color }} />
    </div>
  );
};

export default User;