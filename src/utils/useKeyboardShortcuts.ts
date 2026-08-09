{"import { useState } from 'react';

interface KeyboardShortcuts {
  shortcuts: { [key: string]: string };
}

const useKeyboardShortcuts = (): KeyboardShortcuts => {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcuts>({ shortcuts: {} });

  const updateShortcuts = (shortcuts: { [key: string]: string }) => {
    setShortcuts({ shortcuts });
  };

  return { shortcuts, updateShortcuts };

  return useKeyboardShortcuts;
}

export default useKeyboardShortcuts;