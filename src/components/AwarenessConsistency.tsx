{"import React from 'react';
import { useCursor } from './useCursor';

interface AwarenessConsistencyProps {
  cursors: any[];
  onCursorUpdate: (cursor: any) => void;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ cursors, onCursorUpdate }) => {
  const cursor = useCursor();
  onCursorUpdate(cursor);
  return null;
};

export default AwarenessConsistency;