import React, { useEffect, useRef } from 'react';
import { RemoteCursorProps } from '../types/editor';
import styles from '../styles/user.module.css';

const RemoteCursor: React.FC<RemoteCursorProps> = ({ user, position }) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${position.x}px`;
      cursorRef.current.style.top = `${position.y}px`;
    }
  }, [position]);

  const labelStyle: React.CSSProperties = {
    '--cursor-bg': user.color,
    '--cursor-fg': '#ffffff'
  } as React.CSSProperties;

  return (
    <div className={styles.cursorLabel} style={labelStyle} ref={cursorRef}>
      {user.name}
    </div>
  );
};

export default RemoteCursor;
