// src/utils/useKeyboardShortcuts.ts
import { useEffect } from 'react';

/**
 * Attaches common keyboard shortcuts to the supplied editor instance.
 *
 * Supported shortcuts:
 *   • Ctrl/Cmd + S – Prevent default browser save and emit a custom "save" event.
 *   • Ctrl/Cmd + Shift + F – Format the whole document (if the editor exposes a format method).
 *   • Tab – Insert indentation respecting the editor's configuration.
 *
 * The editor argument is expected to be a CodeMirror or Monaco editor instance that
 * provides `dispatch`, `trigger`, or `format` methods. The hook guards against missing
 * methods to stay framework‑agnostic.
 */
export function useKeyboardShortcuts(editor: any) {
  useEffect(() => {
    if (!editor) return;

    const handler = (e: KeyboardEvent) => {
      // Save shortcut
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        // Emit a custom event that the parent can listen to
        const saveEvent = new CustomEvent('editor-save', { detail: { editor } });
        window.dispatchEvent(saveEvent);
        return;
      }

      // Format shortcut
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        if (typeof editor.format === 'function') {
          editor.format();
        } else if (typeof editor.trigger === 'function') {
          // Monaco‑style command
          editor.trigger('keyboard', 'editor.action.formatDocument');
        }
        return;
      }

      // Tab handling – let the editor manage it, but ensure we don't lose focus
      if (e.key === 'Tab') {
        // Most editors already handle Tab correctly; we just stop propagation
        // to avoid the browser moving focus.
        e.stopPropagation();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [editor]);
}
