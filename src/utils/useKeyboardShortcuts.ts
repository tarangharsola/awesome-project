{"import { useState } from 'react';

interface KeyboardShortcuts {
  shortcuts: { [key: string]: string };
}

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcuts>({ shortcuts: {} });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key in shortcuts) {
      event.preventDefault();
      console.log(`Shortcut pressed: ${event.key}`);
    }
  };

  return { shortcuts, handleKeyDown };
}

export default useKeyboardShortcuts;