{"import { useState, useEffect } from 'react';

interface Props {
  shortcuts: { [key: string]: () => void };
}

const useKeyboardShortcuts = (props: Props) => {
  const [activeShortcut, setActiveShortcut] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (props.shortcuts[event.key]) {
        setActiveShortcut(event.key);
        props.shortcuts[event.key]();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return activeShortcut;
}

export default useKeyboardShortcuts;