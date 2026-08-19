import React, { useEffect, useRef, useState } from 'react';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { useLanguage } from '../utils/useLanguage';
import { useFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { LanguageSelector } from './LanguageSelector';

/**
 * Core editor component.
 * Integrates language switching, default formatting, and keyboard shortcuts.
 */
export const Editor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, getExtension } = useLanguage();
  const formattingExtensions = useFormattingDefaults();
  const [view, setView] = useState<EditorView | null>(null);

  // Initialise CodeMirror once.
  useEffect(() => {
    if (!containerRef.current) return;
    const startState = EditorState.create({
      doc: '',
      extensions: [
        basicSetup,
        getExtension(),
        ...formattingExtensions,
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            // TODO: broadcast changes via WebSocket (handled elsewhere).
          }
        }),
      ],
    });
    const cmView = new EditorView({ state: startState, parent: containerRef.current });
    setView(cmView);
    return () => cmView.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reconfigure language when it changes.
  useEffect(() => {
    if (!view) return;
    view.dispatch({
      effects: EditorView.reconfigure.of([getExtension()]),
    });
  }, [language, view, getExtension]);

  // Apply keyboard shortcuts (re‑apply when language or view changes).
  useEffect(() => {
    if (!view) return;
    const shortcuts = useKeyboardShortcuts(language, view);
    view.dispatch({
      effects: EditorView.reconfigure.of([shortcuts]),
    });
  }, [language, view]);

  return (
    <div className="editor-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <LanguageSelector language={language} onChange={setLanguage} />
      <div ref={containerRef} style={{ flexGrow: 1, border: '1px solid #444' }} />
    </div>
  );
};