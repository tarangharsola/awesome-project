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

const UserList = ({ users }: Props) => {
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    setActiveUsers(users.filter((user) => user.id !== "self"));
  }, [users]);

  return (
    <div className="active-users">
      {activeUsers.map((user) => (
        <div key={user.id} style={{
          backgroundColor: user.color,
          color: "#fff",
          padding: "5px",
          borderRadius: "5px",
          display: "inline-block",
          marginRight: "10px",
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;