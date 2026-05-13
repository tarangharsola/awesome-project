{"import { useState } from 'react';

const useKeyboardShortcuts = () => {
  const [keyboardShortcuts, setKeyboardShortcuts] = useState({
    save: 'Ctrl+S',
    undo: 'Ctrl+Z',
    redo: 'Ctrl+Y'
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