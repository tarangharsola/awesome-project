import React from 'react';
import { useUsers } from '../hooks/useUsers';
import styles from '../styles/user.module.css';

const UserList: React.FC = () => {
  const users = useUsers();
  return (
    <aside className={styles.userList}>
      <h3 className={styles.title}>Active Users</h3>
      <ul className={styles.list}>
        {users.map(u => (
          <li key={u.id} className={styles.userItem} style={{ borderLeftColor: u.color }}>
            <span className={styles.userName}>{u.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default UserList;
