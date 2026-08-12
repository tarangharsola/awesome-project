{"import React from 'react';
import styles from './styles.module.css';

interface UserProps {
  name: string;
  color: string;
}

const User = ({ name, color }: UserProps) => {
  return (
    <div className={styles.user} style={{ backgroundColor: color }}>
      <span className={styles.name}>{name}</span>
    </div>
  );
}

export default User;"