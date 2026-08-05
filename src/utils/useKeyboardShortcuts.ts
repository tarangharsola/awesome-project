{"import { useState } from 'react';

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState({
    'Ctrl+Shift+P': 'Paste',
    'Ctrl+Shift+V': 'Paste',
    'Ctrl+Shift+C': 'Copy',
    'Ctrl+Shift+X': 'Cut'
  });

  const handleShortcut = (event) => {
    console.log(`Shortcut pressed: ${event.key}`);
  };

  return {
    shortcuts,
    handleShortcut
  };
};

export default useKeyboardShortcuts;