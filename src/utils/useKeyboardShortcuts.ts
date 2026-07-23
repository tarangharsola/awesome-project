{"import { useState } from 'react';

const useKeyboardShortcuts = () => {
  const [keyboardShortcuts, setKeyboardShortcuts] = useState({
    'Ctrl+S': 'Save',
    'Ctrl+Shift+S': 'Save As',
  });

  const handleShortcutChange = (event) => {
    setKeyboardShortcuts({
      ...keyboardShortcuts,
      [event.target.name]: event.target.value,
    });
  };

  return {
    keyboardShortcuts,
    handleShortcutChange,
  };
};

export default useKeyboardShortcuts;