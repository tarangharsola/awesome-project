{"import { useState, useEffect } from 'react';

interface KeyboardShortcuts {
  shortcuts: { [key: string]: string };
}

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcuts>({ shortcuts: {} });

  useEffect(() => {
    const storedShortcuts = localStorage.getItem('keyboardShortcuts');
    if (storedShortcuts) {
      setShortcuts(JSON.parse(storedShortcuts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('keyboardShortcuts', JSON.stringify(shortcuts));
  }, [shortcuts]);

  return shortcuts;
}

export default useKeyboardShortcuts;