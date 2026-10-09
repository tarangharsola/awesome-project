import React, { useRef, useState, useCallback, useEffect } from 'react';
import { EditorView } from '@codemirror/view';
import { basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { useCollaboration } from '../hooks/useCollaboration';
import { LanguageSelector } from './LanguageSelector';
import { getFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { formatCode } from '../utils/formatCode';
import './Editor.css';

type Language = 'javascript' | 'python' | 'html';

export const Editor: React.FC = () => {
  const { content, setContent } = useCollaboration();
  const [language, setLanguage] = useState<Language>('javascript');
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const applyFormatting = useCallback(() => {
    const current = viewRef.current?.state.doc.toString() ?? '';
    const formatted = formatCode(current, language);
    if (viewRef.current) {
      viewRef.current.dispatch({
        changes: { from: 0, to: current.length, insert: formatted },
      });
    }
  }, [language]);

  useKeyboardShortcuts(editorRef.current, applyFormatting);

  const initEditor = useCallback(() => {
    if (editorRef.current && !viewRef.current) {
      const extensions = [
        basicSetup,
        language === 'javascript'
          ? javascript()
          : language === 'python'
          ? python()
          : html(),
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            const newContent = v.state.doc.toString();
            setContent(newContent);
          }
        }),
      ];
      viewRef.current = new EditorView({
        doc: content,
        extensions,
        parent: editorRef.current,
      });
    }
  }, [content, language, setContent]);

  // Re‑initialize editor when language changes
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.destroy();
      viewRef.current = null;
    }
    initEditor();
  }, [language, initEditor]);

  // Apply formatting defaults for the selected language
  useEffect(() => {
    const defaults = getFormattingDefaults(language);
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: EditorView.tabSize.of(defaults.tabSize),
      });
    }
  }, [language]);

  return (
    <div className="editor-container">
      <LanguageSelector language={language} onChange={setLanguage} />
      <div ref={editorRef} className="editor" />
    </div>
  );
};
