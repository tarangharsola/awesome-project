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
      {users.map((user) => (
        <div key={user.id} className="user">
          <span className="name" style={{
            backgroundColor: user.color,
            color: "white",
          }}>{user.name}</span>
        </div>
      ))}
    </div>
  );
}

export default UserList;