{"import { useState, useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  handler: () => void;
}

const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  const [activeShortcut, setActiveShortcut] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (shortcuts.some((shortcut) => shortcut.key === event.key)) {
        setActiveShortcut(shortcut);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return activeShortcut;
}

export default useKeyboardShortcuts;