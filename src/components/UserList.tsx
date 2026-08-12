{"import React from 'react';
import User from './User';
import styles from './styles.module.css';

interface UserListProps {
  users: { name: string; color: string }[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div className={styles.userList}>
      {users.map((user, index) => (
        <User key={index} name={user.name} color={user.color} />
      ))}
    </div>
  );
}

export default UserList;"