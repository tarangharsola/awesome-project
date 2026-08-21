import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setContent } from '../store/editorReducer';
import { formatCode } from './formatCode';
import { useLanguage } from './useLanguage';

export const useKeyboardShortcuts = (editorRef: React.RefObject<any>) => {
  const dispatch = useDispatch();
  const { language } = useLanguage();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Save shortcut: Ctrl/Cmd + S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        const editor = editorRef.current;
        if (editor && typeof editor.getValue === 'function') {
          const value = editor.getValue();
          dispatch(setContent(value));
        }
      }

      // Format shortcut: Ctrl/Cmd + Shift + F
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        const editor = editorRef.current;
        if (
          editor &&
          typeof editor.getValue === 'function' &&
          typeof editor.setValue === 'function'
        ) {
          const raw = editor.getValue();
          const formatted = formatCode(raw, language);
          editor.setValue(formatted);
          dispatch(setContent(formatted));
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [editorRef, dispatch, language]);
};