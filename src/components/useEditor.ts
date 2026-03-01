{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';
import { useConflictResolver } from './useConflictResolver';

interface Props {
  documentId: string;
}

const useEditor = ({ documentId }) => {
  const [document, setDocument] = useState('');
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const { sendOperation, operations } = useWebSocket(documentId);
  const { resolveConflicts } = useConflictResolver(operations);

  useEffect(() => {
    const handleOperation = (operation: any) => {
      resolveConflicts(operation);
      setDocument(operation.document);
      setCursor(operation.cursor);
    };
    sendOperation(handleOperation);
  }, [sendOperation, resolveConflicts, setDocument, setCursor]);

  return { document: document, cursor: cursor, sendOperation: sendOperation, operations: operations };
}

export default useEditor;