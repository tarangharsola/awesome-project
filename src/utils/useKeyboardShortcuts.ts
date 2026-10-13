import { keymap } from "@codemirror/view";
import { indentWithTab, indentMore, indentLess } from "@codemirror/commands";
import { indentAll } from "@codemirror/commands";

/**
 * Returns a CodeMirror keymap extension that provides:
 *   • Tab → indent (or insert tab when selection is empty)
 *   • Shift+Tab → outdent
 *   • Ctrl/Cmd+Shift+F → format the whole document (re‑indent)
 *   • Ctrl/Cmd+S → no‑op placeholder for future save handling
 */
export const keyboardShortcuts = (formatCallback: () => void) =>
  keymap.of([
    { key: "Tab", run: indentWithTab },
    { key: "Shift-Tab", run: indentLess },
    { key: "Mod-Shift-f", run: () => { formatCallback(); return true; } },
    { key: "Mod-s", run: () => true }, // placeholder for save
  ]);
