{"import { useState, useEffect } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

const useKeyboardShortcuts = () => {
  const [keyboardShortcuts, setKeyboardShortcuts] = useState({});

  useEffect(() => {
    const view = new EditorView({ state: EditorState.create() });
    const keyboardShortcuts = view.state.doc.toString();
    setKeyboardShortcuts(keyboardShortcuts);
  }, []);

  return keyboardShortcuts;
};

export default useKeyboardShortcuts;