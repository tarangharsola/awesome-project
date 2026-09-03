import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { initEditor, updateEditorContent } from '../utils/editorHelpers';

export const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { content, language } = useSelector((state: RootState) => state.editor);
  const formattingDefaults = useFormattingDefaults(language);
  const { bindShortcuts } = useKeyboardShortcuts();

  // Initialize editor once
  useEffect(() => {
    if (editorRef.current) {
      initEditor(editorRef.current, {
        language,
        value: content,
        ...formattingDefaults,
      });
    }
    // Bind global shortcuts (e.g., format, save)
    const unbind = bindShortcuts();
    return () => {
      unbind();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update editor when language changes
  useEffect(() => {
    if (editorRef.current) {
      updateEditorContent(editorRef.current, {
        language,
        ...formattingDefaults,
      });
    }
  }, [language, formattingDefaults]);

  // Sync content changes from Redux to editor (if needed)
  useEffect(() => {
    if (editorRef.current) {
      updateEditorContent(editorRef.current, { value: content });
    }
  }, [content]);

  return <div ref={editorRef} className="editor-container" />;
};
