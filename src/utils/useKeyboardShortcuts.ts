import { useState, useEffect } from 'react';

interface KeyboardShortcuts {
  [key: string]: string;
}

const useKeyboardShortcuts = (): KeyboardShortcuts => {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcuts>({});

  useEffect(() => {
    // Load keyboard shortcuts from local storage
    const storedShortcuts = localStorage.getItem('keyboardShortcuts');
    if (storedShortcuts) {
      setShortcuts(JSON.parse(storedShortcuts));
    }
  }, []);

  useEffect(() => {
    // Save keyboard shortcuts to local storage
    localStorage.setItem('keyboardShortcuts', JSON.stringify(shortcuts));
  }, [shortcuts]);

  return shortcuts;
}

export default useKeyboardShortcuts;