import React, { useEffect, useRef } from 'react';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { getBaseExtensions } from '../utils/editorExtensions';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { useFormattingDefaults } from '../utils/useFormattingDefaults';

type Props = {
  value: string;
  onChange: (val: string) => void;
  language: string;
  onSave?: () => void;
};

export const Editor: React.FC<Props> = ({ value, onChange, language, onSave }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const formatting = useFormattingDefaults();

  // Initialize CodeMirror instance
  useEffect(() => {
    if (!containerRef.current) return;
    const startState = EditorState.create({
      doc: value,
      extensions: [
        ...getBaseExtensions(language),
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorView.editable.of(true),
        EditorState.tabSize.of(formatting.tabSize),
        EditorState.indentUnit.of(formatting.indentUnit),
      ],
    });
    viewRef.current = new EditorView({
      state: startState,
      parent: containerRef.current,
    });
    return () => {
      viewRef.current?.destroy();
      viewRef.current = null;
    };
  }, [containerRef, language]);

  // Keep editor content in sync with external value changes
  useEffect(() => {
    const view = viewRef.current;
    if (view && view.state.doc.toString() !== value) {
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value },
      });
    }
  }, [value]);

  // Attach keyboard shortcuts
  useKeyboardShortcuts(viewRef.current, onSave);

  return <div ref={containerRef} className="editor-container" />;
};

export default Editor;
