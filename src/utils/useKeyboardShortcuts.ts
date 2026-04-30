{"import { useState } from 'react';

const useKeyboardShortcuts = () => {
  const [keyboardShortcuts, setKeyboardShortcuts] = useState({
    'Ctrl+S': 'save'
  });

  return keyboardShortcuts;
};

export default useKeyboardShortcuts;