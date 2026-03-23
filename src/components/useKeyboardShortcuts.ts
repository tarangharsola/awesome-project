{"import { useState, useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  handler: () => void;
}

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcut[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = shortcuts.find((shortcut) => shortcut.key === event.key);
      if (shortcut) {
        shortcut.handler();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);

  return [shortcuts, setShortcuts];
}
export default useKeyboardShortcuts;