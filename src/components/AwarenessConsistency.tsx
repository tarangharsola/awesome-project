{"import React from 'react';
import { OperationalTransform } from 'operational-transform';

interface AwarenessConsistencyProps {
  operations: OperationalTransform[];
  onAwareness: (awareness: OperationalTransform) => void;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ operations, onAwareness }) => {
  const awareness = new OperationalTransform().apply(operations);
  if (awareness) {
    onAwareness(awareness);
  }
  return null;
};

export default AwarenessConsistency;