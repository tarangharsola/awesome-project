{"import { useState, useEffect } from 'react';

interface KeyboardShortcutsProps {
  shortcuts: { [key: string]: string };
  onChange: (shortcut: string) => void;
}

const useKeyboardShortcuts = ({ shortcuts, onChange }: KeyboardShortcutsProps) => {
  const [activeShortcut, setActiveShortcut] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (shortcuts[event.key]) {
        setActiveShortcut(shortcuts[event.key]);
        onChange(shortcuts[event.key]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts, onChange]);

  return activeShortcut;

  return useKeyboardShortcuts;
}
export default useKeyboardShortcuts;