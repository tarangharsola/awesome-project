// src/utils/useKeyboardShortcuts.ts
import { Dispatch } from 'react';
import { formatDocument } from '../store/editorActions';
import { AnyAction } from 'redux';

/**
 * Registers common keyboard shortcuts for the collaborative editor.
 * Currently supports:
 *   - Ctrl/Cmd + S : Format the document using the configured formatter.
 *   - Ctrl/Cmd + Z : Undo (handled by the editor library itself).
 *   - Ctrl/Cmd + Y / Shift + Ctrl/Cmd + Z : Redo (handled by the editor library).
 */
export const useKeyboardShortcuts = (
  editorContainerRef: React.RefObject<HTMLElement>,
  dispatch: Dispatch<AnyAction>
) => {
  React.useEffect(() => {
    const target = editorContainerRef.current ?? window;
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      // Format document shortcut: Ctrl/Cmd + S
      if (ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        dispatch(formatDocument());
        return;
      }
      // Additional shortcuts can be added here.
    };

    target.addEventListener('keydown', handler);
    return () => target.removeEventListener('keydown', handler);
  }, [editorContainerRef, dispatch]);
};
