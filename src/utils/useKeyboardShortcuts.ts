import { useEffect } from 'react';
import { useCollaboration } from '../hooks/useCollaboration';
import { formatCode } from './formatCode';

export const useKeyboardShortcuts = () => {
  const { code, language, setCode } = useCollaboration();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Prevent browser save dialog on Ctrl/Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
      }

      // Format code on Ctrl/Cmd+Shift+F
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        try {
          const formatted = formatCode(code, language);
          if (formatted !== code) {
            setCode(formatted);
          }
        } catch (_) {
          // Silently ignore formatting errors
        }
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [code, language, setCode]);
};