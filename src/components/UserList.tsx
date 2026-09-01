import React from 'react';
import styles from '../styles/user.module.css';
import { User } from '../types';

type Props = {
  users: User[];
};

export const UserList: React.FC<Props> = ({ users }) => (
  <ul className={styles.userList}>
    {users.map((u) => (
      <li key={u.id} className={styles.userItem}>
        <span className={styles.userColor} style={{ backgroundColor: u.color }} />
        {u.name}
      </li>
    ))}
  </ul>
);