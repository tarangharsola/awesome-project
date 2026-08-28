import React from 'react';
import { useUsers } from '../hooks/useUsers';
import styles from '../styles/user.module.css';

const UserList: React.FC = () => {
  const users = useUsers();
  return (
    <div className={styles.userList}>
      {users.map((user) => (
        <div key={user.id} className={styles.userItem}>
          <span
            className={styles.colorDot}
            style={{ backgroundColor: user.color }}
          />
          <span className={styles.userName}>{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;
