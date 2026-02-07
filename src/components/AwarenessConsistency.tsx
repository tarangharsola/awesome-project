{"import React from 'react';
import { useCursor } from './useCursor';

interface AwarenessConsistencyProps {
  cursor: any;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ cursor }) => {
  const { cursorPositions } = useCursor(cursor);
  if (!cursorPositions.length) return null;

  return (
    <div>
      {cursorPositions.map((position, index) => (
        <div key={index}>{position}</div>
      ))}
    </div>
  );
};

export default AwarenessConsistency;