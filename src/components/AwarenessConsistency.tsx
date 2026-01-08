{"import React from 'react';
import { useCursor } from './useCursor';

interface AwarenessConsistencyProps {
  cursors: any[];
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ cursors }) => {
  const cursor = useCursor(cursors);
  return <div>Cursor position: {cursor.position}</div>;
};

export default AwarenessConsistency;