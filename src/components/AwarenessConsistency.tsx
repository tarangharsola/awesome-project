{"import React from 'react';
import { useCursor } from './useCursor';

interface AwarenessConsistencyProps {
  cursors: any[];
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ cursors }) => {
  const cursor = useCursor();

  return <div>{cursor}</div>;
};

export default AwarenessConsistency;