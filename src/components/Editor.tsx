import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../utils/useLanguage';
import { getFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { initEditor, updateEditorLanguage, applyFormatting } from '../utils/editorCore';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const Editor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const { language } = useLanguage();
  const content = useSelector((state: RootState) => state.editor.content);

  // Initialize editor once
  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      editorRef.current = initEditor(containerRef.current, {
        language,
        value: content,
        ...getFormattingDefaults(language),
      });
    }
  }, []);

  // Update language and formatting when language changes
  useEffect(() => {
    if (editorRef.current) {
      updateEditorLanguage(editorRef.current, language);
      applyFormatting(editorRef.current, getFormattingDefaults(language));
    }
  }, [language]);

  // Sync external content changes (e.g., remote updates)
  useEffect(() => {
    if (editorRef.current && editorRef.current.getValue() !== content) {
      editorRef.current.setValue(content);
    }
  }, [content]);

  // Attach keyboard shortcuts
  useKeyboardShortcuts(editorRef);

  return <div ref={containerRef} style={{ height: '100%', width: '100%' }} />;
};