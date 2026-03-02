{"import { useState, useEffect } from 'react';

interface Props {
  shortcuts: { [key: string]: () => void };
}

const useKeyboardShortcuts = ({ shortcuts }) => {
  const [activeShortcut, setActiveShortcut] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (shortcuts[event.key]) {
        setActiveShortcut(event.key);
        shortcuts[event.key]();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);

  return activeShortcut;
}
export default useKeyboardShortcuts;