import React, { useEffect, useRef } from 'react';
import { useCursor } from '../utils/useCursor';
import { useUsers } from '../utils/useUsers';

interface CursorProps {
  clientId: string;
}

const CursorTracker: React.FC<CursorProps> = ({ clientId }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const { position } = useCursor(clientId);
  const { getUserById } = useUsers();
  const user = getUserById(clientId);

  useEffect(() => {
    if (cursorRef.current && position) {
      cursorRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  }, [position]);

  if (!user) return null;

  const labelStyle: React.CSSProperties = {
    position: 'absolute',
    top: -20,
    left: 0,
    backgroundColor: '#2c2c2c',
    color: '#f0f0f0',
    padding: '2px 4px',
    borderRadius: '3px',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    boxShadow: '0 0 2px rgba(0,0,0,0.5)'
  };

  return (
    <div ref={cursorRef} className="remote-cursor" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <div style={labelStyle}>{user.name}</div>
      <div
        style={{
          width: '2px',
          height: '1.2em',
          backgroundColor: user.color,
          marginTop: '2px'
        }}
      />
    </div>
  );
};

export default CursorTracker;
