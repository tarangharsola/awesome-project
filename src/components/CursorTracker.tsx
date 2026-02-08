{"import React from 'react';
import { useCursor } from './useCursor';
import { CursorTracker } from './CursorTracker';

const CursorTrackerComponent: React.FC = () => {
  const cursor = useCursor();
  return <CursorTracker cursor={cursor} />;
}

export default CursorTrackerComponent;