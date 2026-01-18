{"import React from 'react';
import { OperationalTransform } from 'ot';

interface ConflictResolverProps {
  operations: OperationalTransform[];
  onResolve: (operations: OperationalTransform[]) => void;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ operations, onResolve }) => {
  const [resolvedOperations, setResolvedOperations] = React.useState<OperationalTransform[]>([]);

  React.useEffect(() => {
    const resolveOperations = () => {
      const resolvedOperations = operations.reduce((acc, operation) => {
        return acc.concat(operation.transform(acc));
      }, []);
      setResolvedOperations(resolvedOperations);
      onResolve(resolvedOperations);
    };
    resolveOperations();
  }, [operations, onResolve]);

  return <div>Conflict Resolver</div>;
};

export default ConflictResolver;