import React from 'react';
import { CursorData } from '../types';
import styles from '../styles/remoteCursor.module.css';

export const RemoteCursor: React.FC<{ cursor: CursorData }> = ({ cursor }) => {
  const { position, user } = cursor;
  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    borderLeftColor: user.color,
  } as React.CSSProperties;

  const labelStyle = {
    backgroundColor: user.color,
    color: '#fff',
    padding: '2px 4px',
    borderRadius: '3px',
    fontSize: '0.75rem',
    marginTop: '-1.5em',
    whiteSpace: 'nowrap',
  } as React.CSSProperties;

  return (
    <div className={styles.remoteCursor} style={cursorStyle}>
      <div className={styles.cursorLabel} style={labelStyle}>
        {user.name}
      </div>
    </div>
  );
};
