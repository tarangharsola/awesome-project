{"import { useState, useEffect } from 'react';

interface KeyboardShortcutsProps {
  shortcuts: { [key: string]: string };
  onShortcut: (key: string) => void;
}

const useKeyboardShortcuts = ({ shortcuts, onShortcut }: KeyboardShortcutsProps) => {
  const [activeShortcut, setActiveShortcut] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (shortcuts[key]) {
        onShortcut(key);
        setActiveShortcut(key);
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