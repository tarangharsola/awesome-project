{"import React from 'react';
import './UserList.css';

interface User {
  id: string;
  name: string;
  color: string;
}

interface Props {
  users: User[];
}

const UserList = ({ users }: Props) => {
  return (
    <div className="user-list">
      {users.map((user, index) => (
        <div key={index} className="user">
          <span style={{ backgroundColor: user.color }}></span>
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;