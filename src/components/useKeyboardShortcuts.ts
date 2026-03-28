{"import { useState, useEffect } from 'react';

interface KeyboardShortcutsProps {
  shortcuts: { [key: string]: string };
}

const useKeyboardShortcuts = (props: KeyboardShortcutsProps) => {
  const [activeShortcut, setActiveShortcut] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (props.shortcuts[event.key]) {
        setActiveShortcut(props.shortcuts[event.key]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return activeShortcut;

  return useKeyboardShortcuts;
}
export default useKeyboardShortcuts;