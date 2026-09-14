import { useEffect } from 'react';
import { formatCode } from './editorHelpers';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateContent } from '../store/editorActions';

export const useKeyboardShortcuts = (editorRef: React.RefObject<any>) => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.editor.language);
  const content = useSelector((state: RootState) => state.editor.content);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      // Save shortcut (Ctrl/Cmd+S)
      if (ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        console.log('Save shortcut triggered'); // Placeholder for actual save logic
        return;
      }

      // Format shortcut (Ctrl/Cmd+Shift+F)
      if (ctrlKey && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        const formatted = formatCode(content, language);
        dispatch(updateContent(formatted));
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [content, language, dispatch]);
};