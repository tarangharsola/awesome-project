import React, { useEffect, useRef } from 'react';
import { Editor as MonacoEditor, OnMount } from '@monaco-editor/react';
import { Language } from '../types/editor';
import { useFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { useCollaboration } from '../hooks/useCollaboration';

interface EditorProps {
  initialCode: string;
  language: Language;
  sessionId: string;
  onSave?: () => void;
}

export const Editor: React.FC<EditorProps> = ({ initialCode, language, sessionId, onSave }) => {
  const editorRef = useRef<any>(null);
  const formattingOptions = useFormattingDefaults(language);

  // Collaboration hook handles remote changes and cursor sync
  const { remoteChanges, sendLocalChange, remoteCursors } = useCollaboration({
    editorRef,
    sessionId,
    language,
  });

  // Apply remote changes when they arrive
  useEffect(() => {
    if (!editorRef.current) return;
    const monacoEditor = editorRef.current.getEditor?.();
    if (!monacoEditor) return;
    remoteChanges.forEach((change) => {
      monacoEditor.executeEdits('remote', [change]);
    });
  }, [remoteChanges]);

  // Keyboard shortcuts (save & format)
  useKeyboardShortcuts({ editorRef, onSave });

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = { editor, monaco };
    // Set initial content
    editor.setValue(initialCode);
    // Apply formatting defaults
    editor.updateOptions(formattingOptions);
    // Listen for local changes to broadcast
    editor.onDidChangeModelContent((e) => {
      sendLocalChange(e);
    });
  };

  // Update language mode when prop changes
  useEffect(() => {
    if (!editorRef.current) return;
    const monacoEditor = editorRef.current.getEditor?.();
    if (!monacoEditor) return;
    const model = monacoEditor.getModel();
    if (!model) return;
    const newLanguage = language === 'javascript' ? 'javascript' : language;
    monacoEditor.getModel()?.setMode(newLanguage);
    // Reapply formatting defaults for the new language
    editorRef.current.editor.updateOptions(useFormattingDefaults(language));
  }, [language]);

  return (
    <MonacoEditor
      height="100%"
      defaultLanguage={language}
      defaultValue={initialCode}
      onMount={handleEditorDidMount}
      theme="vs-dark"
    />
  );
};
