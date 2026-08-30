import React from 'react';
import { useUsers } from '../hooks/useUsers';
import styles from '../styles/user.module.css';

export const UserList: React.FC = () => {
  const users = useUsers();

  return (
    <aside className={styles.userList} aria-label="Active users">
      {users.map((u) => (
        <div key={u.id} className={styles.userItem}>
          <span
            className={styles.userColor}
            style={{ backgroundColor: u.color }}
          />
          <span className={styles.userName}>{u.name}</span>
        </div>
      ))}
    </aside>
  );
};