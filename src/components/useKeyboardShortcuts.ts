{"import { useState, useEffect } from 'react';

const useKeyboardShortcuts = () => {
  const [shortcut, setShortcut] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Ctrl+Shift+P') {
        setShortcut('Format Code');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return shortcut;
};

export default useKeyboardShortcuts;