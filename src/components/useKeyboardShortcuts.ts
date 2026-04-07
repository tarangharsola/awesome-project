{"import { useState, useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  handler: () => void;
}

const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (shortcuts.some((shortcut) => shortcut.key === event.key)) {
        shortcut.handler();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return isListening;
}

export default useKeyboardShortcuts;