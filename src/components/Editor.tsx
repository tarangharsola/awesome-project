import React, { useEffect, useRef, useState } from 'react';
import { useEditor } from '../utils/useEditor';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { getDefaultFormattingOptions } from '../utils/editorExtensions';
import { LanguageSelector } from './LanguageSelector';

export const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<string>('javascript');
  const { editor, initializeEditor, formatDocument } = useEditor();

  // Initialize editor once
  useEffect(() => {
    if (editorRef.current && !editor) {
      initializeEditor(editorRef.current, language);
    }
  }, [editorRef, editor, initializeEditor, language]);

  // Apply language change dynamically
  useEffect(() => {
    if (editor) {
      editor.setModelLanguage(language);
      const formattingOpts = getDefaultFormattingOptions(language);
      editor.updateOptions({ formatting: formattingOpts });
    }
  }, [language, editor]);

  // Keyboard shortcuts (formatting, etc.)
  useKeyboardShortcuts({ editor, formatDocument });

  return (
    <div className="editor-container">
      <LanguageSelector selectedLanguage={language} onLanguageChange={setLanguage} />
      <div ref={editorRef} className="code-editor" />
    </div>
  );
};
