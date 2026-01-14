{"import React from 'react';
import { OperationalTransformation } from 'ot-js';

interface ConflictResolverProps {
  operations: any[];
  onConflict: (conflict: any) => void;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ operations, onConflict }) => {
  const ot = new OperationalTransformation(operations);
  const conflict = ot.resolve();
  if (conflict) {
    onConflict(conflict);
  }
  return null;
};

export default ConflictResolver;