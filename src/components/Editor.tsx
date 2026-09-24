import React, { useEffect, useRef } from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { useCollaboration } from '../hooks/useCollaboration';
import { useLanguage } from '../utils/useLanguage';
import { User } from '../types/collaboration';

interface EditorProps {
  roomId: string;
  user: User;
}

export const Editor: React.FC<EditorProps> = ({ roomId, user }) => {
  const { doc, broadcastCursor, applyRemoteEdit } = useCollaboration(roomId, user);
  const editorRef = useRef<any>(null);
  const { language } = useLanguage();

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      const content = editor.getValue();
      applyRemoteEdit(content, doc.version + 1);
    });
    editor.onDidChangeCursorPosition((e: any) => {
      broadcastCursor(e.position.offset);
    });
  };

  useEffect(() => {
    if (editorRef.current && doc.content !== editorRef.current.getValue()) {
      editorRef.current.setValue(doc.content);
    }
  }, [doc.content]);

  return (
    <MonacoEditor
      height="100%"
      language={language}
      value={doc.content}
      onMount={handleEditorDidMount}
      theme="vs-dark"
    />
  );
};