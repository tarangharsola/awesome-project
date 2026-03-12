{"import { useState, useEffect } from 'react';

function useKeyboardShortcuts() {
  const [shortcut, setShortcut] = useState('');
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Ctrl+Shift+P') {
        setShortcut('Paste');
        setActive(true);
      } else if (event.key === 'Ctrl+Shift+C') {
        setShortcut('Copy');
        setActive(true);
      } else if (event.key === 'Ctrl+Shift+V') {
        setShortcut('Paste');
        setActive(true);
      } else if (event.key === 'Ctrl+Shift+X') {
        setShortcut('Cut');
        setActive(true);
      } else if (event.key === 'Ctrl+Shift+A') {
        setShortcut('Select All');
        setActive(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return [shortcut, active];
}
export default useKeyboardShortcuts;