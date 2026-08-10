{"import { useState } from 'react';

interface KeyboardShortcuts {
  shortcuts: { [key: string]: string };
  registerShortcut: (key: string, handler: () => void) => void;
}

const useKeyboardShortcuts = (): KeyboardShortcuts => {
  const [shortcuts, setShortcuts] = useState<{ [key: string]: string }>({});

  const registerShortcut = (key: string, handler: () => void) => {
    setShortcuts((prevShortcuts) => ({ ...prevShortcuts, [key]: handler.toString() }));
  };

  return { shortcuts, registerShortcut };
}

export default useKeyboardShortcuts;