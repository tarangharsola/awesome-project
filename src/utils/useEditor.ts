{"import { useState, useEffect } from 'react';

const useEditor = () => {
  const [editor, setEditor] = useState({ children: '' });
  useEffect(() => {
    const handleInput = (e) => {
      setEditor({ children: e.target.value });
    };
    document.addEventListener('input', handleInput);
    return () => document.removeEventListener('input', handleInput);
  }, []);
  return editor;
};

export default useEditor;