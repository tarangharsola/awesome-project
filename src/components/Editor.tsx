import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store';
import { useWebSocket } from '../hooks/useWebSocket';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { createEditor, EditorView } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { getDefaultContent } from '../utils/useFormattingDefaults';

export const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const language = useSelector((state: AppState) => state.editor.language);
  const { sendMessage } = useWebSocket();

  // Initialize editor
  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      const startDoc = getDefaultContent(language);
      const extensions = [
        language === 'javascript' ? javascript() : null,
        language === 'python' ? python() : null,
        language === 'html' ? html() : null,
      ].filter(Boolean);

      viewRef.current = new EditorView({
        doc: startDoc,
        extensions,
        parent: editorRef.current,
        dispatch: (tr) => {
          viewRef.current?.update([tr]);
          if (tr.docChanged) {
            const content = viewRef.current?.state.doc.toString() ?? '';
            sendMessage({ type: 'content', payload: content });
          }
        },
      });
    }
    // Update language extensions when language changes
    if (viewRef.current) {
      const newExt = language === 'javascript' ? javascript() : language === 'python' ? python() : html();
      viewRef.current.dispatch({
        effects: EditorView.reconfigure.of([newExt]),
      });
    }
  }, [language, sendMessage]);

  // Attach keyboard shortcuts
  useKeyboardShortcuts(viewRef);

  return <div className="editor" ref={editorRef} />;
};
