{"import React from 'react';
import { OperationalTransform } from 'ot-js';

interface ConflictResolverProps {
  operations: any[];
  onConflict: (conflict: any) => void;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ operations, onConflict }) => {
  const ot = new OperationalTransform();
  const conflicts = ot.resolve(operations);
  if (conflicts.length > 0) {
    onConflict(conflicts);
  }
  return null;
};

export default ConflictResolver;