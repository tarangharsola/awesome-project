{"import React from 'react';
import { OperationalTransform } from 'ot-js';

interface ConflictResolverProps {
  operations: any[];
  onResolve: (operations: any[]) => void;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ operations, onResolve }) => {
  const ot = new OperationalTransform();
  const resolvedOperations = ot.resolve(operations);
  onResolve(resolvedOperations);
  return null;
};

export default ConflictResolver;