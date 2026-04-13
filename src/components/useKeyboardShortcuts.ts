{"import { useState, useEffect } from 'react';

const useKeyboardShortcuts = (shortcuts) => {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (shortcuts[event.key]) {
        setPressed(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return pressed;
};

export default useKeyboardShortcuts;