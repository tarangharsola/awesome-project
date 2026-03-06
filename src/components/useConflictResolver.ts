{"import { useState, useEffect } from 'react';
import { OperationalTransform } from 'ot.js';

const useConflictResolver = () => {
  const [ot, setOt] = useState(new OperationalTransform());
  const [localDoc, setLocalDoc] = useState('');
  const [remoteDoc, setRemoteDoc] = useState('');

  useEffect(() => {
    const handleUpdate = (newDoc) => {
      setLocalDoc(newDoc);
      setOt(new OperationalTransform(newDoc, localDoc));
    };

    const handleDelete = (path) => {
      setLocalDoc((doc) => doc.replace(path, ''));
    };

    return () => {
      // Clean up
    };
  }, []);

  const resolveConflict = (localDoc, remoteDoc) => {
    const ot = new OperationalTransform(localDoc, remoteDoc);
    const resolvedDoc = ot.resolve();
    return resolvedDoc;
  };

  return { resolveConflict, localDoc, remoteDoc, handleUpdate, handleDelete };
};

export default useConflictResolver;