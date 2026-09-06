import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { useLanguage } from '../utils/useLanguage';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { useFormattingDefaults } from '../utils/useFormattingDefaults';
import { useReconnection } from '../hooks/useReconnection';
import { useWebSocket } from '../hooks/useWebSocket';

export const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const { language } = useLanguage();
  const formatting = useFormattingDefaults(language);
  const shortcuts = useKeyboardShortcuts();
  const { socket } = useWebSocket();
  useReconnection(socket);

  // Initialize editor once
  useEffect(() => {
    if (!editorRef.current) return;
    const startState = EditorState.create({
      doc: '',
      extensions: [
        basicSetup,
        formatting,
        shortcuts,
        languageExtension(language),
      ],
    });
    viewRef.current = new EditorView({ state: startState, parent: editorRef.current });
    // Cleanup on unmount
    return () => {
      viewRef.current?.destroy();
      viewRef.current = null;
    };
  }, []);

  // React to language changes
  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.dispatch({
      effects: EditorState.reconfigure.of(languageExtension(language)),
    });
  }, [language]);

  return <div ref={editorRef} className="editor" />;
};

function languageExtension(lang: string) {
  switch (lang) {
    case 'javascript':
      return javascript();
    case 'python':
      return python();
    case 'html':
      return html();
    default:
      return javascript();
  }
}
