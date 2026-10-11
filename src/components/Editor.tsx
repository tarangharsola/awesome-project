import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { UPDATE_CONTENT } from '../store/actionTypes';
import { formatCode } from '../utils/formatCode';
import { LanguageSelector } from './LanguageSelector';
import { useCollaboration } from '../hooks/useCollaboration';

export const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const { content, language } = useSelector((state: RootState) => state.editor);
  const editorRef = useRef<HTMLDivElement>(null);
  const { sendChange, remoteChanges } = useCollaboration();

  // Initialize editor (using Monaco as an example)
  useEffect(() => {
    if (!editorRef.current) return;
    const monaco = (window as any).monaco;
    const editorInstance = monaco.editor.create(editorRef.current, {
      value: content,
      language,
      theme: 'vs-dark',
      automaticLayout: true,
    });

    const model = editorInstance.getModel();
    const changeListener = model.onDidChangeContent(() => {
      const newValue = model.getValue();
      dispatch({ type: UPDATE_CONTENT, payload: newValue });
      sendChange(newValue);
    });

    // Apply remote changes
    const remoteListener = remoteChanges.subscribe((remoteContent: string) => {
      if (remoteContent !== model.getValue()) {
        model.setValue(remoteContent);
      }
    });

    // Keyboard shortcuts
    const keydownHandler = (e: KeyboardEvent) => {
      // Format: Ctrl+Shift+F (or Cmd on mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        const formatted = formatCode(model.getValue(), language);
        model.setValue(formatted);
      }
      // Language selector focus: Ctrl+L
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        const selector = document.querySelector('.language-selector') as HTMLElement;
        selector?.focus();
      }
    };
    window.addEventListener('keydown', keydownHandler);

    return () => {
      changeListener.dispose();
      remoteListener.unsubscribe();
      window.removeEventListener('keydown', keydownHandler);
      editorInstance.dispose();
    };
  }, [content, language, dispatch, sendChange, remoteChanges]);

  // Update editor language when it changes
  useEffect(() => {
    if (!editorRef.current) return;
    const monaco = (window as any).monaco;
    const editorInstance = monaco.editor.getEditors()[0];
    if (editorInstance) {
      monaco.editor.setModelLanguage(editorInstance.getModel(), language);
    }
  }, [language]);

  return (
    <div className="editor-container">
      <LanguageSelector />
      <div ref={editorRef} className="editor" />
    </div>
  );
};
