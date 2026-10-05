import React, { useRef, useEffect, useCallback } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useLanguage } from "../utils/useLanguage";
import { getFormattingDefaults } from "../utils/useFormattingDefaults";
import { useKeyboardShortcuts } from "../utils/useKeyboardShortcuts";
import { useCollaboration } from "../hooks/useCollaboration";

export const CodeEditor: React.FC = () => {
  const [language, setLanguage] = useLanguage();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { content, onChange, onRemoteChange } = useCollaboration();

  const handleEditorMount: OnMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    const defaults = getFormattingDefaults(language);
    editor.updateOptions({
      tabSize: defaults.tabSize,
      insertSpaces: defaults.insertSpaces,
    });
  };

  // Apply language change to the monaco model and update formatting options
  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      const model = editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
      const defaults = getFormattingDefaults(language);
      editor.updateOptions({
        tabSize: defaults.tabSize,
        insertSpaces: defaults.insertSpaces,
      });
    }
  }, [language]);

  // Keyboard shortcuts integration
  useKeyboardShortcuts({
    editor: editorRef.current!,
    language,
    formatCallback: () => {
      const editor = editorRef.current;
      if (editor) {
        const action = editor.getAction("editor.action.formatDocument");
        action?.run();
      }
    },
    saveCallback: () => {
      // Placeholder for save logic – can be extended to emit a save event
      console.log("Save shortcut triggered");
    },
  });

  const handleChange = useCallback(
    (value: string | undefined) => {
      onChange(value ?? "");
    },
    [onChange]
  );

  // Apply remote changes coming from collaboration layer
  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.getValue() !== content) {
      const model = editor.getModel();
      if (model) {
        editor.pushUndoStop();
        model.pushEditOperations(
          [],
          [
            {
              range: model.getFullModelRange(),
              text: content,
            },
          ]
        );
        editor.pushUndoStop();
      }
    }
  }, [content]);

  return (
    <div className="editor-container" style={{ height: "100%" }}>
      <Editor
        height="100%"
        language={language}
        value={content}
        onChange={handleChange}
        onMount={handleEditorMount}
        theme="vs-dark"
        options={{
          automaticLayout: true,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
};
