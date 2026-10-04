import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatCode } from './formatCode';
import { RootState } from '../store';
import { updateDocument } from '../store/editorActions';

export const useKeyboardShortcuts = (editorContainerRef: React.RefObject<HTMLElement>) => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.editor.content);
  const language = useSelector((state: RootState) => state.editor.language);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Save (Ctrl/Cmd + S)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        // In a real app, trigger download or server save; here we just log
        console.log('Document saved');
      }
      // Format (Ctrl/Cmd + Shift + F)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        const formatted = formatCode(content, language);
        dispatch(updateDocument(formatted));
      }
    };
    const node = editorContainerRef.current;
    if (node) {
      node.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (node) {
        node.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [editorContainerRef, content, language, dispatch]);
};