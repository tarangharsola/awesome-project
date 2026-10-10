import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { useFormattingDefaults } from '../utils/useFormattingDefaults';
import { initializeEditor } from '../utils/editorHelpers';

export const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { content, language } = useSelector((state: AppState) => state.editor);
  const formattingDefaults = useFormattingDefaults(language);

  useEffect(() => {
    if (editorRef.current) {
      initializeEditor(editorRef.current, {
        language,
        value: content,
        formattingDefaults,
      });
    }
  }, [editorRef, language, content, formattingDefaults]);

  useKeyboardShortcuts(editorRef);

  return <div ref={editorRef} className="editor-container" />;
};
