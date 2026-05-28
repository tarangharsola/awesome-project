{"import { useState } from 'react';

const useKeyboardShortcuts = () => {
  const [keyboardShortcuts, setKeyboardShortcuts] = useState({});

  const handleKeyboardShortcutChange = (newKeyboardShortcuts) => {
    setKeyboardShortcuts(newKeyboardShortcuts);
  };

  return {
    keyboardShortcuts,
    handleKeyboardShortcutChange
  };
};

export default useKeyboardShortcuts;