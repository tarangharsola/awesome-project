{"import React from 'react';
import { OperationalTransform } from 'ot-js';

interface ConflictResolverProps {
  operations: OperationalTransform[];
  onResolve: (operations: OperationalTransform[]) => void;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ operations, onResolve }) => {
  const ot = new OperationalTransform(operations);
  const resolvedOperations = ot.resolve();
  onResolve(resolvedOperations);
  return null;
};

export default ConflictResolver;