{"import { useState, useEffect } from 'react';

interface KeyboardShortcutsProps {
  shortcuts: { [key: string]: () => void };
}

const useKeyboardShortcuts = ({ shortcuts }: KeyboardShortcutsProps) => {
  const [activeShortcut, setActiveShortcut] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (shortcuts[event.key] && event.repeat === false) {
        setActiveShortcut(event.key);
        shortcuts[event.key]();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);

  return activeShortcut;
};

export default useKeyboardShortcuts;