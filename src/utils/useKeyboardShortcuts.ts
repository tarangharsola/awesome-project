import { useState } from 'react';

interface KeyboardShortcuts {
  shortcuts: { [key: string]: string };
}

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState<KeyboardShortcuts>({ shortcuts: {} });

  const updateShortcuts = (newShortcuts: { [key: string]: string }) => {
    setShortcuts({ shortcuts: newShortcuts });
  };

  return { shortcuts, updateShortcuts };
};

export default useKeyboardShortcuts;