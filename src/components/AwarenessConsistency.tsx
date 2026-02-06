{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

interface AwarenessConsistencyProps {
  children: React.ReactNode;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ children }) => {
  const { operations } = useEditor();
  const [awareness, setAwareness] = useState({}
  useEffect(() => {
    const awareness = {};
    operations.forEach((operation) => {
      awareness[operation.path] = operation.type;
    });
    setAwareness(awareness);
  }, [operations]);

  return children;
};

export default AwarenessConsistency;