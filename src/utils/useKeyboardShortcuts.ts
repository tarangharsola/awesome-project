{"import { useState } from 'react';

interface KeyboardShortcuts {
  shortcuts: { [key: string]: string };
}

interface KeyboardShortcutsState {
  keyboardShortcuts: KeyboardShortcuts | null;
  setKeyboardShortcuts: (keyboardShortcuts: KeyboardShortcuts) => void;
}

const useKeyboardShortcuts = (): KeyboardShortcutsState => {
  const [keyboardShortcuts, setKeyboardShortcuts] = useState<KeyboardShortcuts | null>(null);

  const handleKeyboardShortcutsChange = (keyboardShortcuts: KeyboardShortcuts) => {
    setKeyboardShortcuts(keyboardShortcuts);
  };

  return {
    keyboardShortcuts,
    setKeyboardShortcuts: handleKeyboardShortcutsChange,
  };
};

export default useKeyboardShortcuts;