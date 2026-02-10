{"import React, { useState, useEffect } from 'react';

interface Props {
  users: { [key: string]: string };
}

const UserList: React.FC<Props> = ({ users }) => {
  const [activeUsers, setActiveUsers] = useState({} as { [key: string]: string });

  useEffect(() => {
    setActiveUsers(users);
  }, [users]);

  return (
    <div className="user-list">
      {Object.keys(activeUsers).map((userId) => (
        <div key={userId} style={{
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
        }}>{userId}</div>
      ))}
    </div>
  );
}

export default UserList;