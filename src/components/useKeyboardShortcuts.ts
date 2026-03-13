{"import { useState, useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  handler: () => void;
}

const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  const [activeShortcut, setActiveShortcut] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = shortcuts.find((shortcut) => shortcut.key === event.key);
      if (shortcut) {
        setActiveShortcut(shortcut);
        shortcut.handler();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return activeShortcut;
}

export default useKeyboardShortcuts;