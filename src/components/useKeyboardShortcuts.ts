{"import { useState } from 'react';

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState({
    formatCode: 'Ctrl+Shift+F',
    toggleLanguage: 'Ctrl+Shift+L'
  });

  const handleShortcut = (event) => {
    if (event.key === shortcuts.formatCode) {
      // format code logic here
    } else if (event.key === shortcuts.toggleLanguage) {
      // toggle language logic here
    }
  };

  return [shortcuts, handleShortcut];
};

export default useKeyboardShortcuts;