import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import styles from '../styles/user.module.css';

const UserList: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.list);
  return (
    <div className={styles.userList}>
      {users.map(user => (
        <div key={user.id} className={styles.userItem}>
          <span className={styles.userColor} style={{ backgroundColor: user.color }} />
          <span className={styles.userName}>{user.name}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;
