import React from 'react';
import { User } from '../types';
import styles from '../styles/user.module.css';

type Props = {
  users: User[];
};

export const UserList: React.FC<Props> = ({ users }) => (
  <div className={styles.userList}>
    {users.map(user => (
      <div key={user.id} className={styles.userItem}>
        <span
          className={styles.userColor}
          style={{ backgroundColor: user.color }}
        />
        <span>{user.name}</span>
      </div>
    ))}
  </div>
);

export default UserList;
