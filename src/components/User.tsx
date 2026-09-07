import React from 'react';
import { User as UserType } from '../types';
import styles from '../styles/user.module.css';

export const User: React.FC<{ user: UserType }> = ({ user }) => (
  <div
    className={styles.user}
    style={{ backgroundColor: user.color, color: '#fff' }}
  >
    {user.name}
  </div>
);
