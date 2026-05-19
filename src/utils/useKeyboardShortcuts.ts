{"import { useState, useEffect } from 'react';

interface Props {
  language: string;
}

const useKeyboardShortcuts = ({ language }) => {
  const [shortcuts, setShortcuts] = useState({});

  useEffect(() => {
    const loadShortcuts = async () => {
      const response = await fetch(`/api/keyboard-shortcuts/${language}`);
      const data = await response.json();
      setShortcuts(data);
    };
    loadShortcuts();
  }, [language]);

  return shortcuts;
}
export default useKeyboardShortcuts;