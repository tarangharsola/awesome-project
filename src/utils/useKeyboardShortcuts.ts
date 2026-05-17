{"import { useState, useEffect } from 'react';

interface KeyboardShortcuts {
  shortcuts: { [key: string]: string };
}

const useKeyboardShortcuts = () => {
  const [keyboardShortcuts, setKeyboardShortcuts] = useState<KeyboardShortcuts>({ shortcuts: {} });

  useEffect(() => {
    // Load keyboard shortcuts from local storage
    const storedShortcuts = localStorage.getItem('keyboardShortcuts');
    if (storedShortcuts) {
      setKeyboardShortcuts(JSON.parse(storedShortcuts));
    }
  }, []);

  useEffect(() => {
    // Save keyboard shortcuts to local storage
    localStorage.setItem('keyboardShortcuts', JSON.stringify(keyboardShortcuts));
  }, [keyboardShortcuts]);

  return keyboardShortcuts;
};

export default useKeyboardShortcuts;