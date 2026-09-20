import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { useFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { useWebSocket } from '../hooks/useWebSocket';
import { useAwareness } from '../hooks/useAwareness';
import { useCursor } from '../hooks/useCursor';

interface EditorProps {
  language: string;
}

const languageExtension = (lang: string) => {
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
};

const Editor: React.FC<EditorProps> = ({ language }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { sendMessage } = useWebSocket();
  const { awareness } = useAwareness();
  const { cursor } = useCursor();
  const formattingDefaults = useFormattingDefaults(language);

  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: '',
      extensions: [
        basicSetup,
        languageExtension(language),
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            const content = v.state.doc.toString();
            sendMessage({ type: 'content-update', payload: { content } });
          }
        }),
        EditorView.theme({
          '&': { height: '100%' },
        }),
        // Apply formatting defaults
        EditorView.lineWrapping,
        EditorView.editable.of(true),
        EditorState.tabSize.of(formattingDefaults.tabSize),
        EditorState.indentUnit.of(formattingDefaults.indentUnit),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    // Register keyboard shortcuts
    useKeyboardShortcuts(view);

    // Cleanup on unmount
    return () => {
      view.destroy();
    };
  }, [language, formattingDefaults, sendMessage]);

  // Awareness and cursor handling would be added here (omitted for brevity)

  return <div ref={editorRef} className="editor-root" />;
};

export default Editor;
