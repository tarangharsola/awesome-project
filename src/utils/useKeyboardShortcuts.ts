{"import { useState } from 'react';

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState({
    'Ctrl+S': () => console.log('Save'),
    'Ctrl+C': () => console.log('Copy'),
    'Ctrl+V': () => console.log('Paste')
  });

  return shortcuts;
};

export default useKeyboardShortcuts;