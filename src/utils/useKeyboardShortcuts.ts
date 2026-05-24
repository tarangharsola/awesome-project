{"import { useState } from 'react';

interface KeyboardShortcuts {
  shortcuts: { [key: string]: string };
}

const useKeyboardShortcuts = (): KeyboardShortcuts => {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcuts>({ 'Ctrl+C': 'Copy', 'Ctrl+V': 'Paste' });

  const updateShortcuts = (newShortcuts: { [key: string]: string }) => {
    setShortcuts(newShortcuts);
  };

  return { shortcuts, updateShortcuts };

  return useKeyboardShortcuts;
}

export default useKeyboardShortcuts;