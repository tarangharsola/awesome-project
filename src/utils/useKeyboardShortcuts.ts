{"import { useState } from 'react';

const useKeyboardShortcuts = () => {
  const [keyboardShortcuts, setKeyboardShortcuts] = useState({
    'Ctrl+Shift+E': 'toggle-fullscreen'
  });

  const handleShortcutChange = (event) => {
    setKeyboardShortcuts({
      ...keyboardShortcuts,
      [event.target.name]: event.target.value
    });
  };

  return {
    keyboardShortcuts,
    handleShortcutChange
  };
};

export default useKeyboardShortcuts;