{"import { useState } from 'react';

interface KeyboardShortcuts {
  shortcuts: { [key: string]: string };
}

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcuts>({ shortcuts: {} });

  const addShortcut = (key: string, value: string) => {
    setShortcuts((prevShortcuts) => ({ shortcuts: { ...prevShortcuts.shortcuts, [key]: value } }));
  };

  return { shortcuts, addShortcut };
}
export default useKeyboardShortcuts;