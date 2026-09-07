import CodeMirror from 'codemirror';
import { EditorAction } from '../store/actionTypes';

/**
 * Attaches common keyboard shortcuts to the CodeMirror instance.
 * - Ctrl+S / Cmd+S: triggers a custom save event (placeholder).
 * - Ctrl+Shift+F / Cmd+Shift+F: formats the document using the editor's built‑in formatter if available.
 */
export const attachKeyboardShortcuts = (editor: CodeMirror.Editor, dispatch: (action: EditorAction) => void) => {
  editor.addKeyMap({
    'Ctrl-S': (cm) => {
      // Placeholder for save logic – could emit a websocket message or trigger a download.
      // For now we just prevent the default browser save dialog.
      cm.execCommand('save');
    },
    'Cmd-S': (cm) => {
      cm.execCommand('save');
    },
    'Ctrl-Shift-F': (cm) => {
      // If the editor has a format command, invoke it; otherwise, perform a simple auto‑indent.
      if (typeof (cm as any).autoFormatRange === 'function') {
        const totalLines = cm.lineCount();
        cm.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines });
      } else {
        cm.execCommand('selectAll');
        cm.execCommand('indentAuto');
        cm.execCommand('goDocStart');
      }
    },
    'Cmd-Shift-F': (cm) => {
      // Same as above for macOS.
      if (typeof (cm as any).autoFormatRange === 'function') {
        const totalLines = cm.lineCount();
        cm.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines });
      } else {
        cm.execCommand('selectAll');
        cm.execCommand('indentAuto');
        cm.execCommand('goDocStart');
      }
    },
  });
};
