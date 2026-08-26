import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { RootState } from '../store';
import { useLanguage } from '../utils/useLanguage';
import { applyFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';

export const Editor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.editor.content);
  const { language } = useLanguage();

  // Initialize CodeMirror editor once.
  useEffect(() => {
    if (containerRef.current && !viewRef.current) {
      viewRef.current = new EditorView({
        doc: content,
        extensions: [basicSetup],
        parent: containerRef.current,
        dispatch: (tr) => {
          viewRef.current?.update([tr]);
          if (tr.docChanged) {
            const newContent = viewRef.current?.state.doc.toString() ?? '';
            dispatch({ type: 'SET_CONTENT', payload: newContent });
          }
        },
      });
    }
  }, [containerRef, content, dispatch]);

  // Apply language‑specific extensions whenever the language changes.
  useEffect(() => {
    if (viewRef.current) {
      applyFormattingDefaults(viewRef.current, language);
    }
  }, [language]);

  // Register keyboard shortcuts for the editor instance.
  useKeyboardShortcuts(viewRef.current);

  return <div ref={containerRef} className="editor-container" />;
};
