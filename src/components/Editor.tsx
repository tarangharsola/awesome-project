import React, { useEffect, useRef } from "react";
import * as Y from "yjs";
import { MonacoEditor } from "./MonacoEditor"; // Assumes a Monaco wrapper component exists
import { useCollaboration } from "../hooks/useCollaboration";

interface EditorProps {
  /** Unique room identifier extracted from the shareable URL */
  sessionId: string;
  /** Display name entered by the user */
  username: string;
  /** Randomly assigned colour for cursor/awareness */
  color: string;
}

/**
 * Editor component wired to Yjs for real‑time collaboration.
 * It renders a Monaco editor instance and synchronises its content
 * with a shared Y.Text type via the useCollaboration hook.
 */
export const Editor: React.FC<EditorProps> = ({ sessionId, username, color }) => {
  const collab = useCollaboration(sessionId, username, color);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (!collab?.ydoc) return;
    const yText = collab.ydoc.getText("shared");
    const monacoInstance = editorRef.current?.editor;
    if (!monacoInstance) return;

    // Initialise editor content from Yjs.
    monacoInstance.setValue(yText.toString());

    // Local edits -> Yjs.
    const modelChangeDisposable = monacoInstance.onDidChangeModelContent(event => {
      collab.ydoc?.transact(() => {
        event.changes.forEach((change: any) => {
          const { rangeOffset, rangeLength, text } = change;
          yText.delete(rangeOffset, rangeLength);
          yText.insert(rangeOffset, text);
        });
      });
    });

    // Remote Yjs updates -> Monaco.
    const observer = (event: Y.YTextEvent) => {
      // Simple approach: replace whole content. For production, a diff‑based update is preferable.
      monacoInstance.setValue(yText.toString());
    };
    yText.observe(observer);

    return () => {
      modelChangeDisposable.dispose();
      yText.unobserve(observer);
    };
  }, [collab?.ydoc]);

  const connectionClass = collab?.connected ? "connected" : "disconnected";

  return (
    <div className={`editor ${connectionClass}`}>
      <MonacoEditor ref={editorRef} language="javascript" />
    </div>
  );
};
