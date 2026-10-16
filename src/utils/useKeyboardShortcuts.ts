import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setContent } from '../store/editorActions';
import { formatCode } from './formatCode';

export const useKeyboardShortcuts = () => {
  const dispatch = useDispatch();
  const { content, language } = useSelector((state: RootState) => state.editor);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl+S or Cmd+S for formatting
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const formatted = formatCode(content, language);
        dispatch(setContent(formatted));
      }
      // Ctrl+L or Cmd+L to focus language selector
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        const selector = document.querySelector('select[aria-label="Select language"]') as HTMLElement;
        selector?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [content, language, dispatch]);
};
