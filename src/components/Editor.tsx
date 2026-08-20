import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { useYjsDocument } from '../utils/editorCore';
import { setEditorLanguage } from '../utils/editorExtensions';
import { Language, User } from '../types';

type Props = {
  roomId: string;
  user: User;
  language: Language;
};

export const Editor: React.FC<Props> = ({ roomId, user, language }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const { ydoc, provider, yText } = useYjsDocument(roomId, user);

  useEffect(() => {
    if (!containerRef.current) return;
    const editorInstance = monaco.editor.create(containerRef.current, {
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: { enabled: false }
    });
    editorRef.current = editorInstance;

    if (yText) {
      const model = monaco.editor.createModel(yText.toString(), language);
      editorInstance.setModel(model);
      setEditorLanguage(model, language);

      const binding = new (window as any).Y.MonacoBinding(yText, model, new Set([editorInstance]), provider.awareness);

      // Cleanup on unmount
      return () => {
        binding.destroy();
        model.dispose();
        editorInstance.dispose();
      };
    }
  }, [yText, provider, language]);

  // Update language when prop changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.getModel()) {
      setEditorLanguage(editorRef.current.getModel()!, language);
    }
  }, [language]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};