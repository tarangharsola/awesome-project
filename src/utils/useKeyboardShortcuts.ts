{"import { useState } from 'react';

interface Props {
  language: string;
}

const useKeyboardShortcuts = (props: Props) => {
  const [shortcuts, setShortcuts] = useState({
    'Ctrl+Shift+P': 'Paste',
    'Ctrl+Shift+V': 'Paste',
    'Ctrl+Shift+C': 'Copy',
    'Ctrl+Shift+X': 'Cut'
  });

  const handleShortcutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShortcuts({
      ...shortcuts,
      [event.target.name]: event.target.value
    });
  };

  return {
    shortcuts,
    handleShortcutChange
  };

  return useKeyboardShortcuts;
}

export default useKeyboardShortcuts;