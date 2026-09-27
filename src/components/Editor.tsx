import React, { useEffect, useRef } from 'react';
import { Editor as MonacoEditor, OnMount } from '@monaco-editor/react';
import { useCollaboration } from '../hooks/useCollaboration';
import registerKeyboardShortcuts from '../utils/useKeyboardShortcuts';
import getDefaultContent from '../utils/useFormattingDefaults';

type EditorProps = {
  language: string;
  roomId: string;
};

const Editor: React.FC<EditorProps> = ({ language, roomId }) => {
  const { content, setContent, remoteChanges } = useCollaboration(roomId);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    // Load default content if editor is empty
    if (!content) {
      const defaultCode = getDefaultContent(language);
      editor.setValue(defaultCode);
      setContent(defaultCode);
    }
    // Register keyboard shortcuts
    registerKeyboardShortcuts(editor, language);
  };

  // Update editor language when prop changes
  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        const monaco = editorRef.current._standaloneKeybindingService?._editor?.monaco || (window as any).monaco;
        monaco?.editor?.setModelLanguage?.(model, language);
      }
    }
  }, [language]);

  // Apply remote changes
  useEffect(() => {
    if (editorRef.current && remoteChanges !== undefined) {
      const model = editorRef.current.getModel();
      if (model && model.getValue() !== remoteChanges) {
        model.pushEditOperations(
          [],
          [{ range: model.getFullModelRange(), text: remoteChanges }],
          () => null
        );
      }
    }
  }, [remoteChanges]);

  const onChange = (value: string | undefined) => {
    if (value !== undefined) {
      setContent(value);
    }
  };

  return (
    <MonacoEditor
      height="100%"
      defaultLanguage={language}
      defaultValue={content}
      onMount={handleEditorDidMount}
      onChange={onChange}
      theme="vs-dark"
    />
  );
};

export default Editor;