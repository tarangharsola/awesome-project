{"import React from 'react';
import { OperationalTransform } from 'ot-js';

interface ConflictResolverProps {
  operations: any[];
  onConflict: (conflict: any) => void;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ operations, onConflict }) => {
  const ot = new OperationalTransform();
  const resolvedOperations = ot.resolve(operations);
  if (resolvedOperations.length > 0) {
    onConflict(resolvedOperations);
  }
  return null;
};

export default ConflictResolver;