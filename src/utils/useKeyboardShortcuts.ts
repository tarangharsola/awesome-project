{"import { useState } from 'react';

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState({
    format: 'Ctrl+Shift+F'
  });
  return shortcuts;
};

export default useKeyboardShortcuts;