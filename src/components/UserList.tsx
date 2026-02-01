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
        <div key={index} className="user-item">
          <span className="username" style={{
            backgroundColor: user.color,
            color: "#fff",
          }}>
            {user.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default UserList;