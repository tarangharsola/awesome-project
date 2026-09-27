import * as monaco from 'monaco-editor';

type EditorInstance = monaco.editor.IStandaloneCodeEditor;

/**
 * Registers common keyboard shortcuts for the editor.
 * - Ctrl/Cmd + S : Save (currently logs to console; can be wired to actual save logic)
 * - Ctrl/Cmd + Shift + F : Format document using the built‑in formatter
 */
export default function registerKeyboardShortcuts(editor: EditorInstance, _language: string): void {
  const { KeyMod, KeyCode } = monaco;

  // Save shortcut (Ctrl/Cmd+S)
  editor.addCommand(KeyMod.CtrlCmd | KeyCode.KEY_S, () => {
    // Prevent default browser save dialog
    console.log('Save shortcut triggered');
  });

  // Format shortcut (Ctrl/Cmd+Shift+F)
  editor.addCommand(KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.KEY_F, () => {
    const formatAction = editor.getAction('editor.action.formatDocument');
    formatAction?.run();
  });
}
