import React from 'react';
import styles from '../styles/user.module.css';
import { RemoteCursorProps } from '../types';

export const RemoteCursor: React.FC<RemoteCursorProps> = ({ position, user }) => {
  const { name, color } = user;
  const cursorStyle: React.CSSProperties = {
    left: position.x,
    top: position.y,
    borderLeft: `2px solid ${color}`,
    position: 'absolute',
    height: '100%',
    pointerEvents: 'none',
  };
  const labelStyle: React.CSSProperties = {
    backgroundColor: `${color}33`, // semi‑transparent background based on user color
  };
  return (
    <div className={styles.remoteCursor} style={cursorStyle}>
      <div className={styles.cursorLabel} style={labelStyle}>
        {name}
      </div>
    </div>
  );
};