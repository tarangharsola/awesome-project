import React, { useEffect, useRef } from 'react';
import { RemoteCursorData } from '../types/presence';
import './RemoteCursor.css';
import './RemoteCursorOverrides.css'; // Added overrides for dark‑mode readability

interface Props {
  cursor: RemoteCursorData;
}

const RemoteCursor: React.FC<Props> = ({ cursor }) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cursorRef.current) {
      const { top, left } = cursor.position;
      cursorRef.current.style.transform = `translate(${left}px, ${top}px)`;
    }
  }, [cursor.position]);

  return (
    <div className="remote-cursor" ref={cursorRef} style={{ color: cursor.color }}>
      <div className="cursor-indicator" />
      <div className="cursor-label">{cursor.name}</div>
    </div>
  );
};

export default RemoteCursor;
