{"import { useState, useEffect } from 'react';

interface KeyboardShortcutsProps {
  shortcuts: { [key: string]: string };
  onShortcut: (shortcut: string) => void;
}

const useKeyboardShortcuts = ({ shortcuts, onShortcut }: KeyboardShortcutsProps) => {
  const [activeShortcut, setActiveShortcut] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (shortcuts[event.key]) {
        onShortcut(shortcuts[event.key]);
        setActiveShortcut(shortcuts[event.key]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts, onShortcut]);

  return activeShortcut;
}

export default useKeyboardShortcuts;