{"import { useState, useEffect } from 'react';

interface Props {
  language: string;
  onChanges: (changes: { user: string; changes: string[] }) => void;
}

const useEditor = ({ language, onChanges }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const handleChanges = (changes) => {
      onChanges(changes);
    };

    return () => {
      // Clean up
    };
  }, [onChanges]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  return { code, handleCodeChange };
};

export default useEditor;