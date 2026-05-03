import { useState, useEffect } from 'react';

interface KeyboardShortcuts {
  [key: string]: string;
}

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcuts>({});

  useEffect(() => {
    const storedShortcuts = localStorage.getItem('keyboardShortcuts');
    if (storedShortcuts) {
      setShortcuts(JSON.parse(storedShortcuts));
    }
  }, []);

  useEffect(() => {
    if (shortcuts) {
      localStorage.setItem('keyboardShortcuts', JSON.stringify(shortcuts));
    }
  }, [shortcuts]);

  return shortcuts;
}

export default useKeyboardShortcuts;