import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const cursorLabelStyle: React.CSSProperties = {
  position: 'absolute',
  backgroundColor: '#333',
  color: '#fff',
  padding: '2px 4px',
  borderRadius: '3px',
  fontSize: '0.75rem',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  transform: 'translate(-50%, -150%)',
};

const CursorTracker: React.FC = () => {
  const cursors = useSelector((state: RootState) => state.editor.cursors);
  return (
    <>
      {cursors.map(c => (
        <div key={c.id} style={{ position: 'absolute', left: c.x, top: c.y }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: c.color,
            }}
          />
          <div style={cursorLabelStyle}>{c.name}</div>
        </div>
      ))}
    </>
  );
};

export default CursorTracker;
