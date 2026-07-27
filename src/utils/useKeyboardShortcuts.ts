{"import { useState } from 'react';

interface KeyboardShortcuts {
  shortcuts: { [key: string]: string };
}

const useKeyboardShortcuts = (): KeyboardShortcuts => {
  const [shortcuts, setShortcuts] = useState({
    'Ctrl+S': 'Save file',
    'Ctrl+C': 'Copy',
    'Ctrl+V': 'Paste',
  });

  return {
    shortcuts,
  };
};

export default useKeyboardShortcuts;