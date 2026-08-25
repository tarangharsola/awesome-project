import React from 'react';
import { useUsers } from '../hooks/useUsers';
import styles from '../styles/user.module.css';

export const UserList: React.FC = () => {
  const users = useUsers();

  return (
    <ul className={styles.userList}>
      {users.map((user) => (
        <li key={user.id} className={styles.userItem}>
          <span
            className={styles.colorBadge}
            style={{ backgroundColor: user.color }}
          />
          {user.name}
        </li>
      ))}
    </ul>
  );
};
