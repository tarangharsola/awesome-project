{"import { useState, useEffect } from 'react';

interface KeyboardShortcutsProps {
  shortcuts: { [key: string]: string };
  onShortcut: (key: string) => void;
}

const useKeyboardShortcuts = ({ shortcuts, onShortcut }: KeyboardShortcutsProps) => {
  const [activeShortcut, setActiveShortcut] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (shortcuts[event.key]) {
        onShortcut(event.key);
        setActiveShortcut(event.key);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return activeShortcut;

  return useKeyboardShortcuts;
}
export default useKeyboardShortcuts;