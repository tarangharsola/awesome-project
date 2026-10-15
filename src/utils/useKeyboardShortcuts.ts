import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatCode } from '../utils/formatCode';
import { updateContent } from '../store/editorActions';
import { RootState } from '../store';

/**
 * Hook to attach common editor keyboard shortcuts.
 * - Ctrl/Cmd + S: format current document using the selected language.
 * - Additional shortcuts can be added here.
 */
export const useKeyboardShortcuts = (editorRef: React.RefObject<any>) => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.editor.language);
  const content = useSelector((state: RootState) => state.editor.content);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Format on Ctrl/Cmd + S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        const formatted = formatCode(content, language);
        dispatch(updateContent(formatted));
        if (editorRef.current && typeof editorRef.current.setValue === 'function') {
          editorRef.current.setValue(formatted);
        }
      }
      // Placeholder for future shortcuts (e.g., Ctrl+Space for autocomplete)
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [content, language, dispatch, editorRef]);
};
