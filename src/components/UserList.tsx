{"import React from 'react';
import { useUsers } from '../useUsers';

interface Props {
  users: any[];
}

const UserList = ({ users }: Props) => {
  const { colors } = useUsers();
  return (
    <div>
      {users.map((user, index) => (
        <div key={index} style={{
          backgroundColor: colors[user.id],
          padding: '5px',
          borderRadius: '5px',
          color: '#fff',
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;