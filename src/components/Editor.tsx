// src/components/Editor.tsx
import React, { useEffect, useRef } from 'react';
import { useEditor } from '../utils/useEditor';
import { useLanguage } from '../utils/useLanguage';
import { getFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import './Editor.css';

export const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { editor, setOptions } = useEditor();
  const { language } = useLanguage();

  // Apply language‑specific formatting defaults whenever the language changes
  useEffect(() => {
    if (editor) {
      const defaults = getFormattingDefaults(language);
      setOptions(defaults);
    }
  }, [editor, language, setOptions]);

  // Attach keyboard shortcuts
  useKeyboardShortcuts(editor);

  // Initialise the editor once
  useEffect(() => {
    if (editorRef.current && !editor) {
      // The useEditor hook should handle creation of the underlying editor instance.
      // This effect only ensures the container element exists before the hook runs.
    }
  }, [editorRef, editor]);

  return <div ref={editorRef} className="editor-container" />;
};
