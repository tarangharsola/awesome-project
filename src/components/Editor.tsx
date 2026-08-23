import React, { useEffect, useRef, useState, useCallback } from 'react';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { useLanguage } from '../utils/useLanguage';
import { getFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { formatCode } from '../utils/formatCode';
import './Editor.css';
const languageExtensionsMap = {
  javascript,
  python,
  html
} as const;
export const Editor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<EditorView | null>(null);
  const { language, setLanguage } = useLanguage();
  const formatting = getFormattingDefaults(language);
  const initEditor = useCallback(() => {
    if (containerRef.current) {
      const startState = EditorState.create({
        doc: '',
        extensions: [
          basicSetup,
          languageExtensionsMap[language](),
          EditorView.lineWrapping,
          EditorView.theme({
            '&': { fontSize: '14px' }
          })
        ]
      });
      const editorView = new EditorView({ state: startState, parent: containerRef.current });
      setView(editorView);
    }
  }, [language]);
  useEffect(() => {
    initEditor();
    return () => {
      view?.destroy();
    };
  }, [initEditor]);
  const formatCurrentCode = useCallback(() => {
    if (view) {
      const formatted = formatCode(view.state.doc.toString(), language);
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: formatted } });
    }
  }, [view, language]);
  const toggleLanguage = useCallback(() => {
    const order: Array<keyof typeof languageExtensionsMap> = ['javascript', 'python', 'html'];
    const currentIdx = order.indexOf(language as any);
    const next = order[(currentIdx + 1) % order.length];
    setLanguage(next);
  }, [language, setLanguage]);
  useKeyboardShortcuts(view, formatCurrentCode, toggleLanguage);
  return <div ref={containerRef} className="editor-container" />;
};
export default Editor;