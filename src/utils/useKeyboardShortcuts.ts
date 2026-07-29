{"import { useState } from 'react';

interface KeyboardShortcuts {
  shortcuts: { [key: string]: string };
}

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcuts>({ shortcuts: {} });

  const addShortcut = (key: string, shortcut: string) => {
    setShortcuts((prevShortcuts) => ({ shortcuts: { ...prevShortcuts.shortcuts, [key]: shortcut } }));
  };

  return { shortcuts, addShortcut };
}

export default useKeyboardShortcuts;