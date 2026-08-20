import React from 'react';
import { User } from '../types';
import styles from '../styles/user.module.css';

type Props = {
  users: User[];
};

export const UserList: React.FC<Props> = ({ users }) => (
  <ul className={styles.userList}>
    {users.map((u) => (
      <li key={u.id} style={{ color: u.color }}>
        {u.name}
      </li>
    ))}
  </ul>
);
);