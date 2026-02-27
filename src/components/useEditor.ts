{"import { useState, useEffect } from 'react';

interface Props {
  documentId: string;
  language: string;
}

const useEditor = ({ documentId, language }) => {
  const [text, setText] = useState('');
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // implement editor logic here
  }, []);

  return { updateCursor: () => ({ cursor: cursor }) };
}

export default useEditor;