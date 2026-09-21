import React, { useEffect, useRef } from 'react';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { defaultEditorExtensions } from '../utils/editorExtensions';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';

type Language = 'javascript' | 'python' | 'html';

interface Props {
  value: string;
  onChange: (value: string) => void;
  language: Language;
  onSave?: () => void;
  onFormat?: () => void;
}

export const Editor: React.FC<Props> = ({ value, onChange, language, onSave, onFormat }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  // Register keyboard shortcuts (Ctrl+S, Ctrl+Shift+F)
  useKeyboardShortcuts({ viewRef, onSave, onFormat });

  // Initialize editor
  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      const extensions = [
        basicSetup,
        ...defaultEditorExtensions,
        languageExtension(language),
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            const doc = v.state.doc.toString();
            onChange(doc);
          }
        })
      ];

      viewRef.current = new EditorView({
        doc: value,
        extensions,
        parent: editorRef.current,
      });
    } else if (viewRef.current) {
      // Update content when external value changes
      viewRef.current.dispatch({
        changes: { from: 0, to: viewRef.current.state.doc.length, insert: value },
      });
    }
  }, [editorRef, language]);

  // Reconfigure language when prop changes
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: languageExtension(language).reconfigure(),
      });
    }
  }, [language]);

  return <div ref={editorRef} className="editor-container" />;
};

function languageExtension(lang: Language) {
  switch (lang) {
    case 'javascript':
      return javascript();
    case 'python':
      return python();
    case 'html':
      return html();
    default:
      return [];
  }
}