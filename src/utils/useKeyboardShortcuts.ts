{"import { useState } from 'react';
import { useEditor } from './useEditor';

const useKeyboardShortcuts = () => {
  const [shortcuts, setShortcuts] = useState({
    'Ctrl+S': 'save'
  });
  const { editor } = useEditor();
  const handleShortcutChange = (shortcut: string, action: string) => {
    setShortcuts({ ...shortcuts, [shortcut]: action });
    editor.setShortcut(shortcut, action);
  };
  return { shortcuts, handleShortcutChange };
};

export default useKeyboardShortcuts;