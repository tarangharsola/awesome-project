import React, { useEffect, useRef } from 'react';
import { useEditor } from '../utils/useEditor';
import styles from '../styles/user.module.css';

type RemoteCursorProps = {
  userId: string;
  name: string;
  color: string;
  x: number;
  y: number;
};

export const RemoteCursor: React.FC<RemoteCursorProps> = ({ userId, name, color, x, y }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const editor = useEditor();

  useEffect(() => {
    if (cursorRef.current && editor) {
      cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [x, y, editor]);

  return (
    <div
      ref={cursorRef}
      className={styles.remoteCursor}
      style={{ position: 'absolute', pointerEvents: 'none', zIndex: 10 }}
    >
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: color,
          marginBottom: '2px',
        }}
      />
      <span className={styles.cursorLabel}>{name}</span>
    </div>
  );
};