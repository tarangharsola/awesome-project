{"import { useState } from 'react';
import { useEditor } from '../utils/useEditor';

const useKeyboardShortcuts = () => {
  const [keyboardShortcuts, setKeyboardShortcuts] = useState({
    save: 'Ctrl+S',
    undo: 'Ctrl+Z',
    redo: 'Ctrl+Y',
  });
  const { editor } = useEditor();

  const handleKeyboardShortcutChange = (event) => {
    setKeyboardShortcuts({
      save: event.target.save.value,
      undo: event.target.undo.value,
      redo: event.target.redo.value,
    });
  };

  return {
    keyboardShortcuts,
    handleKeyboardShortcutChange,
  };
};

export default useKeyboardShortcuts;