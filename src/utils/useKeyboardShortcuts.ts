{"import { useState, useEffect } from 'react';

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState({
    'Ctrl+S': () => {
      console.log('Save');
    },
    'Ctrl+Shift+S': () => {
      console.log('Save As');
    }
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (shortcuts[event.key]) {
        shortcuts[event.key]();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);

  return shortcuts;
};

export default useKeyboardShortcuts;