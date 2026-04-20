{"import { useState, useEffect } from 'react';

const useEditor = (onChange: (value: string) => void) => {
  const [value, setValue] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    onChange(value);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setValue(value + '\n');
      setCursorPosition(cursorPosition + 1);
    }
  };

  return { handleKeyDown, cursorPosition };
};

export default useEditor;