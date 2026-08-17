{"import { useState } from 'react';

interface Props {
  language: string;
}

const useKeyboardShortcuts = (props: Props) => {
  const [shortcuts, setShortcuts] = useState({
    'Ctrl+S': 'Save File',
    'Ctrl+Shift+S': 'Save As',
    'Ctrl+C': 'Copy',
    'Ctrl+V': 'Paste',
  });

  const handleLanguageChange = (language: string) => {
    switch (language) {
      case 'javascript':
        setShortcuts({
          'Ctrl+S': 'Save File',
          'Ctrl+Shift+S': 'Save As',
          'Ctrl+C': 'Copy',
          'Ctrl+V': 'Paste',
        });
        break;
      case 'python':
        setShortcuts({
          'Ctrl+S': 'Save File',
          'Ctrl+Shift+S': 'Save As',
          'Ctrl+C': 'Copy',
          'Ctrl+V': 'Paste',
        });
        break;
      case 'html':
        setShortcuts({
          'Ctrl+S': 'Save File',
          'Ctrl+Shift+S': 'Save As',
          'Ctrl+C': 'Copy',
          'Ctrl+V': 'Paste',
        });
        break;
      default:
        setShortcuts({
          'Ctrl+S': 'Save File',
          'Ctrl+Shift+S': 'Save As',
          'Ctrl+C': 'Copy',
          'Ctrl+V': 'Paste',
        });
        break;
    }
  };

  return {
    shortcuts,
    handleLanguageChange,
  };
}

export default useKeyboardShortcuts;