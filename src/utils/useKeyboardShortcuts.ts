{"import { useState, useEffect } from 'react';

interface KeyboardShortcutsState {
  shortcuts: { [key: string]: string };
  setShortcuts: (shortcuts: { [key: string]: string }) => void;
}

const useKeyboardShortcuts = (): KeyboardShortcutsState => {
  const [shortcuts, setShortcuts] = useState({
    'Ctrl+S': 'Save',
    'Ctrl+Shift+S': 'Save As',
  });

  useEffect(() => {
    const storedShortcuts = localStorage.getItem('shortcuts');
    if (storedShortcuts) {
      setShortcuts(JSON.parse(storedShortcuts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
  }, [shortcuts]);

  return { shortcuts, setShortcuts };
}

export default useKeyboardShortcuts;