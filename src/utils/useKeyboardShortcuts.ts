{"import { useState, useEffect } from 'react';

interface UseKeyboardShortcutsReturn {
  keyboardShortcuts: { [key: string]: string };
  updateKeyboardShortcuts: (shortcuts: { [key: string]: string }) => void;
}

const useKeyboardShortcuts = (): UseKeyboardShortcutsReturn => {
  const [keyboardShortcuts, setKeyboardShortcuts] = useState({
    'Ctrl+S': 'Save File',
    'Ctrl+Shift+S': 'Save As',
  });

  const updateKeyboardShortcuts = (shortcuts: { [key: string]: string }) => {
    setKeyboardShortcuts(shortcuts);
  };

  useEffect(() => {
    const storedShortcuts = localStorage.getItem('keyboardShortcuts');
    if (storedShortcuts) {
      setKeyboardShortcuts(JSON.parse(storedShortcuts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('keyboardShortcuts', JSON.stringify(keyboardShortcuts));
  }, [keyboardShortcuts]);

  return { keyboardShortcuts, updateKeyboardShortcuts };
}

export default useKeyboardShortcuts;