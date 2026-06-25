{"import { useState, useEffect } from 'react';

interface KeyboardShortcuts {
  shortcuts: { [key: string]: string };
}

interface UseKeyboardShortcutsProps {
  shortcuts: KeyboardShortcuts;
}

const useKeyboardShortcuts = ({ shortcuts }: UseKeyboardShortcutsProps) => {
  const [activeShortcut, setActiveShortcut] = useState(null);

  useEffect(() => {
    const handleShortcutChange = (shortcut: string) => {
      setActiveShortcut(shortcut);
    };

    return () => {
      // Clean up
    };
  }, []);

  return { activeShortcut, setActiveShortcut };
}
export default useKeyboardShortcuts;