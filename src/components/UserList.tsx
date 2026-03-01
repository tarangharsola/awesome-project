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
        <div key={index} style={{
          backgroundColor: user.color,
          color: "#fff",
          padding: "10px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span>{user.name}</span>
          <span>{user.id}</span>
        </div>
      ))}
    </div>
  );
}

export default UserList;