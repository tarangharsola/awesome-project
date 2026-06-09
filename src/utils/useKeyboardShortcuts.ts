{"import { useState } from 'react';

interface KeyboardShortcuts {
  shortcuts: { [key: string]: string };
  addShortcut: (key: string, shortcut: string) => void;
}

const useKeyboardShortcuts = (): KeyboardShortcuts => {
  const [shortcuts, setShortcuts] = useState<{ [key: string]: string }>({ });

  const addShortcut = (key: string, shortcut: string) => {
    setShortcuts((prevShortcuts) => ({ ...prevShortcuts, [key]: shortcut }));
  };

  return { shortcuts, addShortcut };

  return useKeyboardShortcuts;
}

export default useKeyboardShortcuts;