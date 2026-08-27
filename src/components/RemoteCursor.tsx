import React from 'react';
import { CursorData } from '../types/editor';
import styles from '../styles/user.module.css';

type Props = {
  cursor: CursorData;
};

export const RemoteCursor: React.FC<Props> = ({ cursor }) => {
  const { position, color, name } = cursor;
  const wrapperStyle = {
    position: 'absolute' as const,
    left: `${position.column * 8}px`,
    top: `${position.row * 18}px`,
    pointerEvents: 'none' as const,
  };

  const labelStyle = {
    borderLeft: `2px solid ${color}`,
    backgroundColor: 'rgba(30,30,30,0.9)',
    color: '#fff',
    padding: '2px 4px',
    borderRadius: '3px',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap' as const,
  };

  return (
    <div style={wrapperStyle}>
      <div className={styles.cursorLabel} style={labelStyle}>
        {name}
      </div>
    </div>
  );
};

export default RemoteCursor;
