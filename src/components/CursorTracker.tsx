import React from 'react';
import styles from '../styles/user.module.css';
import { CursorData } from '../types';

type Props = {
  cursor: CursorData;
};

const CursorTracker: React.FC<Props> = ({ cursor }) => {
  const { x, y, user } = cursor;
  const style: React.CSSProperties = {
    left: x,
    top: y,
    borderColor: user.color,
  };

  return (
    <div className={styles.cursor} style={style}>
      <div className={styles.cursorLabel}>{user.name}</div>
    </div>
  );
};

export default CursorTracker;