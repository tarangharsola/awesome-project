import { useEffect } from "react";
import * as monaco from "monaco-editor";

export interface ShortcutOptions {
  editor: monaco.editor.IStandaloneCodeEditor;
  language: string;
  formatCallback?: () => void;
  saveCallback?: () => void;
}

export function useKeyboardShortcuts({
  editor,
  language,
  formatCallback,
  saveCallback,
}: ShortcutOptions) {
  useEffect(() => {
    if (!editor) return;

    const disposables: monaco.IDisposable[] = [];

    // Save (Ctrl/Cmd + S)
    disposables.push(
      editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
        () => {
          saveCallback?.();
        }
      )
    );

    // Format (Shift+Alt+F)
    disposables.push(
      editor.addCommand(
        monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KEY_F,
        () => {
          formatCallback?.();
        }
      )
    );

    // Tab handling – insert spaces according to editor settings
    disposables.push(
      editor.addCommand(monaco.KeyCode.Tab, () => {
        const model = editor.getModel();
        if (!model) return;
        const selections = editor.getSelections() || [];
        const spaces = " ".repeat(editor.getOption(monaco.editor.EditorOption.tabSize));
        editor.executeEdits(
          "tab",
          selections.map((sel) => ({
            range: sel,
            text: spaces,
            forceMoveMarkers: true,
          }))
        );
      })
    );

    return () => {
      disposables.forEach((d) => d.dispose());
    };
  }, [editor, language, formatCallback, saveCallback]);
}
