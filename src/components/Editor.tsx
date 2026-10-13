import React, { useEffect, useRef, useState } from "react";
import { EditorView, basicSetup } from "@codemirror/basic-setup";
import { EditorState } from "@codemirror/state";
import { useLanguage } from "../utils/useLanguage";
import { useFormattingDefaults } from "../utils/useFormattingDefaults";
import { keyboardShortcuts } from "../utils/useKeyboardShortcuts";
import { LanguageSelector } from "./LanguageSelector";
import { indentUnit } from "@codemirror/language";
import { lineWrapping } from "@codemirror/view";

export const Editor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const [language, setLanguage] = useState<"javascript" | "python" | "html">("javascript");

  // Resolve language extension and formatting defaults whenever language changes
  const languageExtension = useLanguage(language);
  const formatting = useFormattingDefaults(language);

  // Formatting callback – currently re‑indents the whole document
  const formatDocument = () => {
    if (viewRef.current) {
      // Re‑indent all lines using the built‑in command
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { indentAll } = require("@codemirror/commands");
      indentAll(viewRef.current);
    }
  };

  // Initialise CodeMirror once
  useEffect(() => {
    if (containerRef.current && !viewRef.current) {
      const startState = EditorState.create({
        doc: "",
        extensions: [
          basicSetup,
          languageExtension,
          indentUnit.of(formatting.indentUnit),
          lineWrapping,
          keyboardShortcuts(formatDocument),
        ],
      });
      viewRef.current = new EditorView({ state: startState, parent: containerRef.current });
    }
    // Cleanup on unmount
    return () => {
      viewRef.current?.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update extensions when language or formatting changes
  useEffect(() => {
    if (viewRef.current) {
      const newExtensions = [
        languageExtension,
        indentUnit.of(formatting.indentUnit),
        lineWrapping,
        keyboardShortcuts(formatDocument),
      ];
      viewRef.current.dispatch({
        effects: EditorState.reconfigure.of(newExtensions),
      });
    }
  }, [languageExtension, formatting]);

  return (
    <div className="editor-wrapper" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ padding: "0.5rem", background: "var(--panel-bg)" }}>
        <LanguageSelector current={language} onChange={setLanguage} />
      </div>
      <div ref={containerRef} style={{ flexGrow: 1 }} />
    </div>
  );
};
