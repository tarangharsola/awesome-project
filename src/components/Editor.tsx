import React, { useEffect, useRef } from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { defaultKeymap } from '@codemirror/commands';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { Language } from '../types';
import './Editor.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  language: Language;
};

export const Editor: React.FC<Props> = ({ value, onChange, language }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const { registerShortcut } = useKeyboardShortcuts();

  // Initialize or re‑initialize the editor when language changes
  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up any existing view
    viewRef.current?.destroy();
    viewRef.current = null;

    const languageExtension =
      language === 'javascript'
        ? javascript()
        : language === 'python'
        ? python()
        : language === 'html'
        ? html()
        : javascript();

    const extensions = [
      keymap.of([...defaultKeymap]),
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          const newValue = update.state.doc.toString();
          onChange(newValue);
        }
      }),
      EditorView.lineWrapping,
      EditorView.theme({
        '&': {
          height: '100%',
          fontFamily: 'var(--font-mono)',
        },
      }),
      // Formatting defaults
      EditorState.tabSize.of(2),
      EditorState.indentUnit.of('  '),
      languageExtension,
    ];

    viewRef.current = new EditorView({
      doc: value,
      extensions,
      parent: containerRef.current,
    });

    // Register common shortcuts
    registerShortcut('Mod-s', () => {
      // Save shortcut – placeholder for future persistence logic
      console.log('Document saved (Ctrl/Cmd+S)');
    });
    registerShortcut('Shift-Mod-f', () => {
      // Simple format: re‑indent whole document
      const view = viewRef.current;
      if (!view) return;
      const fullRange = { from: 0, to: view.state.doc.length };
      view.dispatch({
        changes: [{ ...fullRange, insert: view.state.doc.toString() }],
      });
    });

    return () => {
      viewRef.current?.destroy();
      viewRef.current = null;
    };
    // Re‑run when language or initial value changes
  }, [language, value, onChange, registerShortcut]);

  // Keep editor content in sync when external value changes (e.g., remote edits)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  return <div ref={containerRef} className="editor-container" />;
};