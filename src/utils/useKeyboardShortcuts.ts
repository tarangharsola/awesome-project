{"import { useState } from 'react';

const useKeyboardShortcuts = () => {
  const [keyboardShortcuts, setKeyboardShortcuts] = useState({});

  const handleShortcutChange = (newKeyboardShortcuts) => {
    setKeyboardShortcuts(newKeyboardShortcuts);
  };

  return {
    keyboardShortcuts,
    handleShortcutChange
  };
};

export default useKeyboardShortcuts;