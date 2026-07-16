{"import { useState } from 'react';

interface Props {
  language: string;
}

const useKeyboardShortcuts = ({ language }: Props) => {
  const [shortcuts, setShortcuts] = useState({
    indent: 'tab',
    outdent: 'shift+tab',
    newline: 'enter',
  });

  const handleUpdate = (key: string, value: any) => {
    setShortcuts((prevShortcuts) => ({ ...prevShortcuts, [key]: value }));
  };

  return {
    shortcuts,
    handleUpdate,
  };

  return useKeyboardShortcuts;
}
export default useKeyboardShortcuts;