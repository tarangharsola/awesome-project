{"import { useState } from 'react';

interface Props {
  shortcuts: { [key: string]: string };
}

const useKeyboardShortcuts = ({ shortcuts }: Props) => {
  const [activeShortcut, setActiveShortcut] = useState(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (shortcuts[event.key]) {
      setActiveShortcut(shortcuts[event.key]);
    }
  };

  return [activeShortcut, handleKeyDown];
};

export default useKeyboardShortcuts;