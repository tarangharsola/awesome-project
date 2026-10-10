import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateContent } from '../store/editorActions';

export const useKeyboardShortcuts = (editorRef: React.RefObject<HTMLElement>) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      // Save shortcut: Ctrl/Cmd + S
      if (ctrlKey && e.key === 's') {
        e.preventDefault();
        // Placeholder for save logic – could trigger a download or server sync
        console.log('Save shortcut triggered');
        return;
      }

      // Format shortcut: Ctrl/Cmd + Shift + F
      if (ctrlKey && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        // Simple formatting: trim trailing spaces and ensure newline at end
        if (editorRef.current) {
          const editorEl = editorRef.current as any; // editor instance type may vary
          const raw = editorEl.innerText || '';
          const formatted = raw
            .split('\n')
            .map((line) => line.replace(/\s+$/g, ''))
            .join('\n')
            .replace(/\s+$/g, '') + '\n';
          dispatch(updateContent(formatted));
          // Update editor UI if possible
          if (editorEl.setValue) {
            editorEl.setValue(formatted);
          } else {
            editorEl.innerText = formatted;
          }
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editorRef, dispatch]);
};
