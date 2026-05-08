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
    const activeUsers = users.filter((user) => user.id !== "self");
    setActiveUsers(activeUsers);
  }, [users]);

  return (
    <div className="active-users">
      {activeUsers.map((user) => (
        <div key={user.id} style={{
          backgroundColor: user.color,
          padding: "4px",
          borderRadius: "4px",
          display: "inline-block",
          marginRight: "8px",
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default UserList;