{"import { useState, useEffect } from 'react';

interface KeyboardShortcutsProps {
  shortcuts: { [key: string]: string };
  onChange: (shortcut: string) => void;
}

const useKeyboardShortcuts = ({ shortcuts, onChange }) => {
  const [currentShortcut, setCurrentShortcut] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (shortcuts[event.key]) {
        onChange(shortcuts[event.key]);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, onChange]);

  return [currentShortcut, setCurrentShortcut];
}
export default useKeyboardShortcuts;