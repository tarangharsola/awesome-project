import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setContent } from '../store/editorActions';

export const useKeyboardShortcuts = (editorRef: React.RefObject<HTMLElement>) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S or Cmd+S -> format (placeholder for actual formatter)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        // Simple formatting: trim trailing spaces
        if (editorRef.current) {
          const text = (editorRef.current as any).innerText || '';
          const formatted = text.replace(/[ \t]+\n/g, '\n');
          dispatch(setContent(formatted));
        }
      }
      // Ctrl+Shift+L -> toggle language selector focus (example shortcut)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        const selector = document.getElementById('language-selector');
        selector?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch, editorRef]);
};
