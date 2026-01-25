{"import React from 'react';
import { OperationalTransform } from 'operational-transform';

interface ConflictResolverProps {
  operations: OperationalTransform[];
  onConflict: (conflict: OperationalTransform) => void;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ operations, onConflict }) => {
  const conflict = new OperationalTransform().apply(operations);
  if (conflict) {
    onConflict(conflict);
  }
  return null;
};

export default ConflictResolver;