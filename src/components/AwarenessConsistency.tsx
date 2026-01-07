{"import React from 'react';
import { AwarenessConsistency } from 'ot-js';

interface AwarenessConsistencyProps {
  operations: any[];
  onAwareness: (awareness: any) => void;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ operations, onAwareness }) => {
  const ac = new AwarenessConsistency(operations);
  const awareness = ac.getAwareness();
  onAwareness(awareness);
  return null;
};

export default AwarenessConsistency;