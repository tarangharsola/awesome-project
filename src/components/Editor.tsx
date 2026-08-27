import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { RootState } from '../store';
import { useFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import LanguageSelector from './LanguageSelector';

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const { content, language } = useSelector((state: RootState) => state.editor);
  const formattingExtensions = useFormattingDefaults(language);

  // Initialize CodeMirror view
  useEffect(() => {
    if (!editorRef.current) return;
    const startState = EditorState.create({
      doc: content,
      extensions: [basicSetup, ...formattingExtensions],
    });
    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });
    viewRef.current = view;
    // Attach keyboard shortcuts
    useKeyboardShortcuts(view);
    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // Re‑initialize only when language changes to apply new extensions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // Sync external content changes (e.g., from remote users)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const currentDoc = view.state.doc.toString();
    if (currentDoc !== content) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: content },
      });
    }
  }, [content]);

  return (
    <div className="editor-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <LanguageSelector />
      <div ref={editorRef} style={{ flexGrow: 1, overflow: 'auto' }} />
    </div>
  );
};

export default Editor;