import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatCode } from './formatCode';
import { setContent } from '../store/editorActions';
import { RootState } from '../store';

interface Props {
  editorRef: React.RefObject<HTMLElement>;
}

export const useKeyboardShortcuts = ({ editorRef }: Props) => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.editor.content);
  const language = useSelector((state: RootState) => state.editor.language);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Save shortcut: Ctrl/Cmd + S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        console.log('Save shortcut triggered');
        // Placeholder for actual save logic (e.g., send snapshot to server)
      }

      // Format shortcut: Ctrl/Cmd + Shift + F
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        const formatted = formatCode(content, language);
        dispatch(setContent(formatted));
        console.log('Format shortcut applied');
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [content, language, dispatch]);
};