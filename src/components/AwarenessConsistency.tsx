{"import React from 'react';
import { useCursor } from './useCursor';

interface AwarenessConsistencyProps {
  cursors: any[];
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ cursors }) => {
  const cursor = useCursor(cursors);
  return <div style={{ position: 'absolute', top: cursor.y, left: cursor.x, width: 10, height: 10, backgroundColor: 'red' }} />
};

export default AwarenessConsistency;