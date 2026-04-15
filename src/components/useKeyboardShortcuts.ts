{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useKeyboardShortcuts = () => {
  const editor = useEditor();
  const [shortcuts, setShortcuts] = useState({});

  useEffect(() => {
    setShortcuts(editor.getShortcuts);
  }, [editor.getShortcuts]);

  return shortcuts;
};

export default useKeyboardShortcuts;