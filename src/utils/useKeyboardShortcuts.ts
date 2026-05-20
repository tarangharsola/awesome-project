{"import { useState, useEffect } from 'react';

interface KeyboardShortcuts {
  shortcuts: { [key: string]: string };
}

interface KeyboardShortcutsProps {
  shortcuts: KeyboardShortcuts;
  onChange: (shortcuts: KeyboardShortcuts) => void;
}

const useKeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ shortcuts, onChange }) => {
  const [localShortcuts, setLocalShortcuts] = useState(shortcuts);

  useEffect(() => {
    onChange(localShortcuts);
  }, [localShortcuts, onChange]);

  const handleShortcutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalShortcuts({ ...localShortcuts, [event.target.name]: event.target.value });
  };

  return localShortcuts;
}

export default useKeyboardShortcuts;