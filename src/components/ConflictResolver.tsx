{"import React from 'react';
import { OperationalTransformation } from 'operational-transformation';

interface ConflictResolverProps {
  children: React.ReactNode;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ children }) => {
  const [state, dispatch] = OperationalTransformation.useOperationalTransformation();
  return (
    <div>
      {children}
      <button onClick={() => dispatch({ type: 'insert', text: 'Hello, World!' })}>Insert text</button>
    </div>
  );
};

export default ConflictResolver;