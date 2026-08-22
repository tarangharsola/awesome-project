import { useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { getFormattingDefaults } from './useFormattingDefaults';
import { useLanguage } from './useLanguage';
import { useDispatch } from 'react-redux';

export const useKeyboardShortcuts = (editor: monaco.editor.IStandaloneCodeEditor | null) => {
  const { language, setLanguage } = useLanguage();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!editor) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S => format document
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        editor.getAction('editor.action.formatDocument').run();
      }
      // Ctrl/Cmd + Shift + L => cycle language
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        const languages = ['javascript', 'python', 'html'];
        const next = languages[(languages.indexOf(language) + 1) % languages.length];
        setLanguage(next);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor, language, setLanguage]);

  // Apply formatting defaults when language changes
  useEffect(() => {
    if (!editor) return;
    const defaults = getFormattingDefaults(language);
    editor.updateOptions(defaults);
  }, [editor, language]);
};