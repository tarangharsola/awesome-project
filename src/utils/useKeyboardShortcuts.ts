{"import { useState } from 'react';

interface KeyboardShortcuts {
  indent: string;
  outdent: string;
  toggleBold: string;
}

const useKeyboardShortcuts = () => {
  const [keyboardShortcuts, setKeyboardShortcuts] = useState<KeyboardShortcuts>({ indent: 'tab', outdent: 'shift+tab', toggleBold: 'ctrl+b' });

  const handleIndentChange = (indent: string) => {
    setKeyboardShortcuts({ ...keyboardShortcuts, indent });
  };

  const handleOutdentChange = (outdent: string) => {
    setKeyboardShortcuts({ ...keyboardShortcuts, outdent });
  };

  const handleToggleBoldChange = (toggleBold: string) => {
    setKeyboardShortcuts({ ...keyboardShortcuts, toggleBold });
  };

  return {
    keyboardShortcuts,
    handleIndentChange,
    handleOutdentChange,
    handleToggleBoldChange
  };
};

export default useKeyboardShortcuts;