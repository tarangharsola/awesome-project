import React, { useEffect, useRef, useCallback } from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { useLanguage } from '../utils/useLanguage';
import { useFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { formatCode } from '../utils/formatCode';
import './Editor.css';

/**
 * Core editor component using CodeMirror 6.
 * Supports language switching, default formatting, and custom keyboard shortcuts.
 */
const Editor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const { language } = useLanguage();
  const formattingDefaults = useFormattingDefaults(language);
  const shortcuts = useKeyboardShortcuts({ formatDocument });

  // Initialize the editor once
  useEffect(() => {
    if (containerRef.current && !viewRef.current) {
      const startState = EditorState.create({
        doc: '',
        extensions: [
          keymap.of(shortcuts),
          EditorView.lineWrapping,
          formattingDefaults,
          languageExtension(language),
        ],
      });
      viewRef.current = new EditorView({ state: startState, parent: containerRef.current });
    }
    // Cleanup on unmount
    return () => {
      viewRef.current?.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update language extension when language changes
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: EditorView.reconfigure.of([languageExtension(language), formattingDefaults]),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, formattingDefaults]);

  // Format the current document using the selected language's formatter
  const formatDocument = useCallback(() => {
    if (!viewRef.current) return;
    const currentCode = viewRef.current.state.doc.toString();
    const formatted = formatCode(currentCode, language);
    if (formatted !== currentCode) {
      viewRef.current.dispatch({
        changes: { from: 0, to: viewRef.current.state.doc.length, insert: formatted },
      });
    }
  }, [language]);

  return <div ref={containerRef} className="editor-container" />;
};

/**
 * Returns the appropriate language extension for CodeMirror based on the selected language.
 */
function languageExtension(lang: string) {
  switch (lang) {
    case 'javascript':
      return javascript();
    case 'python':
      return python();
    case 'html':
      return html();
    default:
      return []; // fallback to plain text
  }
}

export default Editor;
