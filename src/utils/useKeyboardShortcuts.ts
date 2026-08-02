{"import { useState, useEffect } from 'react';

interface Props {
  language: string;
  shortcuts: { [key: string]: string };
}

const useKeyboardShortcuts = ({ language, shortcuts }: Props) => {
  const [activeShortcut, setActiveShortcut] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (shortcuts[event.key]) {
        setActiveShortcut(shortcuts[event.key]);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [language, shortcuts]);

  return activeShortcut;
};

export default useKeyboardShortcuts;