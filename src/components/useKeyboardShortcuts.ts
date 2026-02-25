{"import { useState } from 'react';

const useKeyboardShortcuts = () => {
  const [activeShortcut, setActiveShortcut] = useState(null);
  const handleKeyDown = (event) => {
    if (event.key === 'Ctrl+C') {
      setActiveShortcut('copy');
    } else if (event.key === 'Ctrl+V') {
      setActiveShortcut('paste');
    }
  };
  return [activeShortcut, handleKeyDown];
};

export default useKeyboardShortcuts;