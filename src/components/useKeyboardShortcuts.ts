{"import { useState, useEffect } from 'react';

interface KeyboardShortcutsProps {
  shortcuts: { [key: string]: string };
  onShortcut: (shortcut: string) => void;
}

const useKeyboardShortcuts = ({ shortcuts, onShortcut }: KeyboardShortcutsProps) => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (shortcuts[event.key]) {
        onShortcut(shortcuts[event.key]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts, onShortcut]);

  return pressedKeys;
}
export default useKeyboardShortcuts;