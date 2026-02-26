{"import React from 'react';
import { User } from './User';

interface Props {
  users: User[];
}

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      {users.map((user, index) => (
        <div key={index} className="user-item">
          <span style={{
            backgroundColor: user.color,
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "50%"
          }}></span>
          <span className="user-name">{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;