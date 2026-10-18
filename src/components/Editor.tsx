// src/components/Editor.tsx
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEditor } from '../utils/useEditor';
import { useFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { useLanguage } from '../utils/useLanguage';

export const Editor: React.FC = () => {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const content = useSelector((state: RootState) => state.editor.content);
  const language = useSelector((state: RootState) => state.editor.language);

  const formatting = useFormattingDefaults(language);
  const languageExtension = useLanguage(language);

  const { view, setContent } = useEditor({
    container: editorContainerRef.current,
    initialDoc: content,
    extensions: [languageExtension, ...formatting.extensions],
  });

  // Apply keyboard shortcuts once the view is ready
  useEffect(() => {
    if (view) {
      useKeyboardShortcuts(view);
    }
  }, [view]);

  // Keep editor content in sync with Redux state
  useEffect(() => {
    if (view && view.state.doc.toString() !== content) {
      setContent(content);
    }
  }, [content, view, setContent]);

  return <div ref={editorContainerRef} className="editor" />;
};