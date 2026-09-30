import React, { useRef, useEffect } from 'react';
import MonacoEditor, { monaco } from '@monaco-editor/react';
import { Language } from '../types/editor';
import { formatCode } from '../utils/formatCode';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';

type Props = {
  value: string;
  language: Language;
  onChange: (value: string) => void;
  onSave?: () => void;
};

export const Editor: React.FC<Props> = ({ value, language, onChange, onSave }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    _: typeof monaco
  ) => {
    editorRef.current = editor;
    // Format shortcut: Ctrl/Cmd + Shift + F
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KEY_F,
      () => {
        const formatted = formatCode(editor.getValue(), language);
        editor.setValue(formatted);
      }
    );
    // Save shortcut: Ctrl/Cmd + S
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
      () => {
        onSave?.();
      }
    );
  };

  // Update editor language when prop changes
  useEffect(() => {
    if (editorRef.current) {
      monaco.editor.setModelLanguage(editorRef.current.getModel()!, language);
    }
  }, [language]);

  // Global shortcuts (e.g., when editor not focused)
  useKeyboardShortcuts({ editorRef, onSave });

  return (
    <MonacoEditor
      height="100%"
      defaultLanguage={language}
      language={language}
      value={value}
      onChange={onChange}
      onMount={handleEditorDidMount}
      theme="vs-dark"
      options={{
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      }}
    />
  );
};