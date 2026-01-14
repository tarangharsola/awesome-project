{"import { useState, useEffect } from 'react';

interface EditorState {
  content: string;
  cursor: { position: number; }
}

const useEditor = (initialContent: string, initialCursor: { position: number }) => {
  const [content, setContent] = useState(initialContent);
  const [cursor, setCursor] = useState(initialCursor);
  useEffect(() => {
    const interval = setInterval(() => {
      setContent(content + 'Hello World');
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return { content, cursor, operations: [] };
};

export default useEditor;