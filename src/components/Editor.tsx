import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setContent } from '../store/editorActions';
import { useLanguage } from '../utils/useLanguage';
import { getFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { LanguageSelector } from './LanguageSelector';
import * as monaco from 'monaco-editor';

export const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const { language } = useLanguage();
  const content = useSelector((state: RootState) => state.editor.content);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  // Apply formatting defaults when language changes
  useEffect(() => {
    const defaults = getFormattingDefaults(language);
    if (editorInstanceRef.current) {
      editorInstanceRef.current.updateOptions({
        tabSize: defaults.tabSize,
        insertSpaces: defaults.insertSpaces,
      });
    }
  }, [language]);

  // Initialize Monaco editor
  useEffect(() => {
    if (editorContainerRef.current && !editorInstanceRef.current) {
      editorInstanceRef.current = monaco.editor.create(editorContainerRef.current, {
        value: content,
        language,
        theme: 'vs-dark',
        automaticLayout: true,
      });

      editorInstanceRef.current.onDidChangeModelContent(() => {
        const value = editorInstanceRef.current?.getValue() || '';
        dispatch(setContent(value));
      });
    }
    // Update language when it changes
    if (editorInstanceRef.current) {
      const model = editorInstanceRef.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [dispatch, language]);

  // Sync external content changes (e.g., from remote users)
  useEffect(() => {
    if (editorInstanceRef.current) {
      const current = editorInstanceRef.current.getValue();
      if (current !== content) {
        editorInstanceRef.current.setValue(content);
      }
    }
  }, [content]);

  // Keyboard shortcuts
  useKeyboardShortcuts(editorContainerRef);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '8px', background: 'var(--bg-primary)' }}>
        <LanguageSelector />
      </div>
      <div ref={editorContainerRef} style={{ flexGrow: 1 }} />
    </div>
  );
};
