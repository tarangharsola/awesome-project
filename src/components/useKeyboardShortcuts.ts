{"import { useState } from 'react';

const useKeyboardShortcuts = () => {
  const [shortcut, setShortcut] = useState('');

  const handleShortcutChange = (shortcut: string) => {
    setShortcut(shortcut);
  };

  return {
    shortcut,
    handleShortcutChange
  };
};

export default useKeyboardShortcuts;