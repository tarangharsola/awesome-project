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
      {activeUsers.map((user, index) => (
        <div key={index} style={{
          backgroundColor: user.color,
          color: "#fff",
          padding: "5px",
          borderRadius: "5px",
          marginRight: "5px",
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default UserList;