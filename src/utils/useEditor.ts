import { useEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { useConflictResolver } from "../hooks/useConflictResolver";
import { DocumentChange } from "../types/editor";

/**
 * Initializes a CodeMirror editor instance with syntax highlighting based on the
 * selected language and wires it up to the conflict‑resolution hook.
 */
export function useEditor(
  container: HTMLDivElement | null,
  language: "javascript" | "python" | "html",
  initialContent: string,
  onChange: (change: DocumentChange) => void
) {
  const { applyLocal, applyRemote, getContent } = useConflictResolver(initialContent);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!container) return;

    const languageExtension =
      language === "javascript"
        ? javascript()
        : language === "python"
        ? python()
        : html();

    const state = EditorState.create({
      doc: initialContent,
      extensions: [languageExtension, EditorView.updateListener.of((v) => {
        if (v.docChanged) {
          v.changes.iterChanges((fromA, toA, fromB, toB, inserted) => {
            const change: DocumentChange = {
              range: { start: fromA, end: toA },
              text: inserted.sliceString(0)
            };
            applyLocal(change);
            onChange(change);
          });
        }
      })]
    });

    viewRef.current = new EditorView({ state, parent: container });

    return () => {
      viewRef.current?.destroy();
      viewRef.current = null;
    };
  }, [container, language, initialContent, onChange, applyLocal]);

  // Expose a method for remote updates.
  return {
    applyRemoteChange: (change: DocumentChange) => {
      applyRemote(change);
      const view = viewRef.current;
      if (view) {
        const tr = view.state.update({ changes: { from: change.range.start, to: change.range.end, insert: change.text } });
        view.dispatch(tr);
      }
    },
    getCurrentContent: getContent
  } as const;
}
