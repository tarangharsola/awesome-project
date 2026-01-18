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
          padding: '5px',
          borderRadius: '5px',
          marginRight: '10px',
          color: '#fff',
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default UserList;