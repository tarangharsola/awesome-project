import React, { useEffect, useRef } from 'react';
import { EditorView } from '@codemirror/view';
import { basicSetup } from '@codemirror/basic-setup';
import { useLanguage } from '../utils/useLanguage';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { useWebSocket } from '../hooks/useWebSocket';

type EditorProps = {
  language: string;
  onSave?: () => void;
};

const Editor: React.FC<EditorProps> = ({ language, onSave }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const languageExtensions = useLanguage(language);
  const { sendMessage } = useWebSocket(); // assume this hook provides a sendMessage function

  // Initialize CodeMirror view
  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      viewRef.current = new EditorView({
        doc: '',
        extensions: [basicSetup, ...languageExtensions],
        parent: editorRef.current,
        dispatch: tr => {
          viewRef.current?.update([tr]);
          if (tr.docChanged) {
            const content = viewRef.current?.state.doc.toString() ?? '';
            sendMessage({ type: 'content-update', payload: { content } });
          }
        },
      });
    }
    // Cleanup on unmount
    return () => {
      viewRef.current?.destroy();
      viewRef.current = null;
    };
  }, [languageExtensions, sendMessage]);

  // Apply keyboard shortcuts (save, format)
  useKeyboardShortcuts(viewRef.current, { onSave, language });

  // Update language extensions when language changes
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: EditorView.reconfigure.of([basicSetup, ...languageExtensions]),
      });
    }
  }, [languageExtensions]);

  return <div ref={editorRef} className="code-editor" />;
};

export default Editor;
