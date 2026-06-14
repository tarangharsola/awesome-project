{"import { useState, useEffect } from 'react';

interface KeyboardShortcuts {
  [key: string]: string;
}

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcuts>({ 'Ctrl+C': 'Copy', 'Ctrl+V': 'Paste' });

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