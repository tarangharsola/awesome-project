{"import { useState, useEffect } from 'react';

interface Props {
  shortcuts: { [key: string]: string };
  onChange: (shortcut: string) => void;
}

const useKeyboardShortcuts = ({ shortcuts, onChange }: Props) => {
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
  }, []);

  return currentShortcut;

  return useKeyboardShortcuts;
}
export default useKeyboardShortcuts;