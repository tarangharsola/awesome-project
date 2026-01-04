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

const Header = ({ users }: Props) => {
  const [activeUsers, setActiveUsers] = useState(users);

  useEffect(() => {
    setActiveUsers(users);
  }, [users]);

  return (
    <div className="active-users">
      {activeUsers.map((user, index) => (
        <span key={index} style={{
          backgroundColor: user.color,
          color: "#fff",
          padding: "5px",
          borderRadius: "10px",
          marginRight: "10px",
        }}>
          {user.name}
        </span>
      ))}
    </div>
  );
};

export default Header;