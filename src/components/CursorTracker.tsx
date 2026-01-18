{"import React from 'react';
import { useCursor } from './useCursor';

interface CursorTrackerProps {
  cursor: any;
}

const CursorTracker: React.FC<CursorTrackerProps> = ({ cursor }) => {
  const { position } = useCursor(cursor);
  return <div>Cursor Position: {position}</div>;
}

export default CursorTracker;