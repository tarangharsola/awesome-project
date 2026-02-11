{"import React from 'react';
import { OperationalTransformation } from 'ot-js';

interface ConflictResolverProps {
  children: React.ReactNode;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ children }) => {
  const ot = new OperationalTransformation();
  const [conflicts, setConflicts] = React.useState([]);

  React.useEffect(() => {
    const handleConflict = (conflict: any) => {
      setConflicts((prevConflicts) => [...prevConflicts, conflict]);
    };
    ot.on('conflict', handleConflict);
    return () => ot.off('conflict', handleConflict);
  }, []);

  return (
    <div>
      {children}
      {conflicts.map((conflict, index) => (
        <div key={index}>{conflict}</div>
      ))}
    </div>
  );
};

export default ConflictResolver;