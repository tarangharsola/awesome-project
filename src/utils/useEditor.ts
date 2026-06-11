{"import { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editor';

const useEditor = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const handleInput = (e) => {
      setContent(e.target.value);
    };

    document.addEventListener('input', handleInput);

    return () => {
      document.removeEventListener('input', handleInput);
    };
  }, []);

  return { content, setContent };
};

export default useEditor;