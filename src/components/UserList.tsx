{"import React from 'react';

interface Props {
  users: { name: string; color: string }[];
}

const UserList = ({ users }: Props) => {
  return <ul>
    {users.map((user) => <li key={user.name} style={{ color: user.color }}>{user.name}</li>)}
  </ul>
};

export default UserList;