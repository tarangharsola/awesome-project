{"import { useState } from 'react';

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState({
    'Ctrl+S': 'save'
  });

  const handleKeyDown = (event) => {
    if (shortcuts[event.key]) {
      console.log(`Shortcut pressed: ${shortcuts[event.key]}`);
    }
  };

  return [shortcuts, handleKeyDown];
};

export default useKeyboardShortcuts;