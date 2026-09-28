import React, { useEffect, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { useKeyboardShortcuts } from "../utils/useKeyboardShortcuts";
import { useEditor } from "../utils/useEditor";
import { getFormattingDefaults } from "../utils/useFormattingDefaults";

const Editor: React.FC = () => {
  const editor = useEditor();
  const [language, setLanguage] = useState<string>("javascript");

  // Apply language mode to the underlying editor instance
  useEffect(() => {
    if (!editor) return;
    // CodeMirror API
    if (typeof editor.setOption === "function") {
      editor.setOption("mode", language);
    }
    // Monaco API
    else if (typeof editor.updateOptions === "function") {
      editor.updateOptions({ language });
    }
  }, [editor, language]);

  // Apply formatting defaults when language changes
  useEffect(() => {
    if (!editor) return;
    const defaults = getFormattingDefaults(language);
    if (typeof editor.setOption === "function") {
      editor.setOption("indentUnit", defaults.indentSize);
      editor.setOption("indentWithTabs", defaults.useTabs);
    }
  }, [editor, language]);

  // Register global keyboard shortcuts
  useKeyboardShortcuts(editor, setLanguage);

  return (
    <div className="editor-container">
      <LanguageSelector language={language} onChange={setLanguage} />
      <div id="editor" />
    </div>
  );
};

export default Editor;
