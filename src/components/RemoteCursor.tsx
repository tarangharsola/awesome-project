import React, { useEffect, useRef } from 'react';
import { RemoteCursorData } from '../types';
import styles from '../styles/user.module.css';

type Props = {
  cursor: RemoteCursorData;
};

const RemoteCursor: React.FC<Props> = ({ cursor }) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cursorRef.current) {
      const { x, y } = cursor.position;
      cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [cursor.position]);

  return (
    <div className={styles.remoteCursor} ref={cursorRef}>
      <div
        style={{
          width: '2px',
          height: '1.2em',
          backgroundColor: cursor.color,
        }}
      />
      <div className={styles.remoteCursorLabel} style={{ color: '#fff' }}>
        {cursor.username}
      </div>
    </div>
  );
};

export default RemoteCursor;