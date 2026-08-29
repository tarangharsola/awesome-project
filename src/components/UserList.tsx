import React from 'react';
import { User } from '../types';
import styles from '../styles/user.module.css';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div>
      {users.map((user) => {
        const itemStyle: React.CSSProperties = {
          '--user-bg': user.color,
          '--user-fg': '#ffffff'
        } as React.CSSProperties;
        return (
          <div key={user.id} className={styles.userItem} style={itemStyle}>
            <div className={styles.userAvatar} />
            <span>{user.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
