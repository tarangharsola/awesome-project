import { useEffect } from "react";
import { formatCode } from "./formatCode";

type SetLanguage = (lang: string) => void;

/**
 * Registers global keyboard shortcuts for the collaborative editor.
 *
 * - Ctrl+Shift+F : Format the current document using the appropriate formatter.
 * - Ctrl+1       : Switch language to JavaScript.
 * - Ctrl+2       : Switch language to Python.
 * - Ctrl+3       : Switch language to HTML.
 */
export const useKeyboardShortcuts = (
  editor: any,
  setLanguage: SetLanguage
) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Format code: Ctrl+Shift+F
      if (e.ctrlKey && e.shiftKey && e.key === "F") {
        e.preventDefault();
        if (editor) {
          const raw = editor.getValue ? editor.getValue() : "";
          const mode =
            (editor.getOption && editor.getOption("mode")) || "javascript";
          const formatted = formatCode(raw, mode);
          if (editor.setValue) {
            editor.setValue(formatted);
          }
        }
        return;
      }

      // Language switching: Ctrl+1 / Ctrl+2 / Ctrl+3
      if (e.ctrlKey && !e.shiftKey && !e.altKey) {
        if (e.key === "1") {
          e.preventDefault();
          setLanguage("javascript");
        } else if (e.key === "2") {
          e.preventDefault();
          setLanguage("python");
        } else if (e.key === "3") {
          e.preventDefault();
          setLanguage("html");
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [editor, setLanguage]);
};
