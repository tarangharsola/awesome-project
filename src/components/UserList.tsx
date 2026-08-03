{"import React from 'react';
import { useUsers } from '../utils/useUsers';
import User from './User';

interface Props {
}

const UserList: React.FC<Props> = () => {
  const { users } = useUsers();
  return (
    <div style={{
      padding: 10,
    }}>
      {users.map((user) => (
        <User key={user.name} user={user} />
      ))}
    </div>
  );
}

export default UserList;