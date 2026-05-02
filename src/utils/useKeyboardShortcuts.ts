{"import { useState } from 'react';

interface Props {
  language: string;
}

const useKeyboardShortcuts = ({ language }: Props) => {
  const [shortcuts, setShortcuts] = useState({
    'Ctrl+C': 'copy',
    'Ctrl+V': 'paste',
    'Ctrl+Z': 'undo',
    'Ctrl+Y': 'redo',
  });
  const handleUpdate = (updates: { [key: string]: any }) => {
    setShortcuts((prevShortcuts) => ({ ...prevShortcuts, ...updates }));
  };
  return [shortcuts, handleUpdate];
};

export default useKeyboardShortcuts;