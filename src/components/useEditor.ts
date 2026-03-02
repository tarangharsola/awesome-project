{"import { useState, useEffect } from 'react';

interface EditorState {
  documentId: string;
  text: string;
  cursorId: string;
}

const useEditor = (documentId: string) => {
  const [document, setDocument] = useState<EditorState>({ documentId, text: '', cursorId: '' });

  useEffect(() => {
    const handleDocumentChange = (newDocument: EditorState) => {
      setDocument(newDocument);
    };
    // Simulate real-time updates from WebSocket
    const intervalId = setInterval(() => {
      handleDocumentChange({
        documentId,
        text: 'Real-time update: ' + new Date().toISOString(),
        cursorId: document.cursorId,
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [documentId]);

  return { document, setDocument };
}

export default useEditor;