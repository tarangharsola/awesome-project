import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { baseExtensions, languageExtension, keymapExtensions } from '../utils/editorExtensions';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { formatCode } from '../utils/formatCode';

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  language: string;
};

export const Editor: React.FC<EditorProps> = ({ value, onChange, language }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  // Formatting callback used by the shortcut hook
  const format = () => {
    const formatted = formatCode(value, language);
    if (formatted !== value) {
      onChange(formatted);
    }
  };

  // Initial mount
  useEffect(() => {
    if (!containerRef.current) return;
    const startState = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        ...baseExtensions,
        languageExtension(language),
        useKeyboardShortcuts(format),
        ...keymapExtensions,
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            const newValue = v.state.doc.toString();
            onChange(newValue);
          }
        }),
      ],
    });
    viewRef.current = new EditorView({ state: startState, parent: containerRef.current });
    return () => {
      viewRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recreate editor when language changes to apply new syntax highlighting
  useEffect(() => {
    if (!containerRef.current) return;
    viewRef.current?.destroy();
    const startState = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        ...baseExtensions,
        languageExtension(language),
        useKeyboardShortcuts(format),
        ...keymapExtensions,
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            const newValue = v.state.doc.toString();
            onChange(newValue);
          }
        }),
      ],
    });
    viewRef.current = new EditorView({ state: startState, parent: containerRef.current });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // Keep editor content in sync when external value changes
  useEffect(() => {
    if (viewRef.current) {
      const current = viewRef.current.state.doc.toString();
      if (current !== value) {
        viewRef.current.dispatch({
          changes: { from: 0, to: current.length, insert: value },
        });
      }
    }
  }, [value]);

  return <div ref={containerRef} className="editor-container" />;
};