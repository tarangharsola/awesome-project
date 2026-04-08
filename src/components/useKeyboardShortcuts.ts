import { useState, useEffect } from 'react';

interface KeyboardShortcutsProps {
  shortcuts: { [key: string]: string };
  onChange: (shortcut: string) => void;
}

const useKeyboardShortcuts = ({ shortcuts, onChange }: KeyboardShortcutsProps) => {
  const [currentShortcut, setCurrentShortcut] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key in shortcuts) {
        onChange(shortcuts[event.key]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts, onChange]);

  return currentShortcut;
};

export default useKeyboardShortcuts;