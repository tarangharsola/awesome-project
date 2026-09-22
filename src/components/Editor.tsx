import React, { useEffect, useRef, useState } from 'react';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { useWebSocket } from '../hooks/useWebSocket';
import { useCursor } from '../hooks/useCursor';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { formatCode } from '../utils/formatCode';
import { getDefaultExtensions } from '../utils/editorExtensions';
import LanguageSelector from './LanguageSelector';
import { Language } from '../types/editor';

const languageExtensions: Record<Language, any> = {
  javascript,
  python,
  html,
};

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<Language>('javascript');
  const [view, setView] = useState<EditorView | null>(null);
  const { sendMessage } = useWebSocket();
  const { updateCursor } = useCursor();

  // Initialize CodeMirror view
  useEffect(() => {
    if (!editorRef.current) return;
    const startState = EditorState.create({
      doc: '',
      extensions: [
        languageExtensions[language](),
        ...getDefaultExtensions(language),
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            const content = v.state.doc.toString();
            sendMessage({ type: 'content', payload: content });
          }
          if (v.selectionSet) {
            const cursor = v.state.selection.main.head;
            updateCursor(cursor);
          }
        }),
      ],
    });
    const editorView = new EditorView({ state: startState, parent: editorRef.current });
    setView(editorView);
    return () => editorView.destroy();
  }, [editorRef, language, sendMessage, updateCursor]);

  // Apply formatting shortcut via custom hook
  useKeyboardShortcuts({
    format: () => {
      if (!view) return;
      const currentCode = view.state.doc.toString();
      const formatted = formatCode(currentCode, language);
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: formatted },
      });
    },
    save: () => {
      // Placeholder for future persistence; currently just logs.
      console.log('Document saved (placeholder)');
    },
  });

  return (
    <div className="editor-container">
      <div className="toolbar">
        <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
      </div>
      <div ref={editorRef} className="editor" />
    </div>
  );
};

export default Editor;
