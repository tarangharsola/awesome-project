import { useEffect } from "react";
import { EditorView } from "@codemirror/view";
import { AwarenessUser } from "../types";

/**
 * Hook that sends the local cursor position over WebSocket and updates remote cursors.
 */
export function useCursor(
  view: EditorView | null,
  ws: WebSocket | null,
  user: AwarenessUser
) {
  useEffect(() => {
    if (!view || !ws) return;

    const reportCursor = () => {
      const { from } = view.state.selection.main;
      const line = view.state.doc.lineAt(from);
      const cursor = { line: line.number, ch: from - line.from };
      ws.send(
        JSON.stringify({ type: "cursor", payload: { ...user, cursor } })
      );
    };

    view.dom.addEventListener("keyup", reportCursor);
    view.dom.addEventListener("click", reportCursor);

    return () => {
      view.dom.removeEventListener("keyup", reportCursor);
      view.dom.removeEventListener("click", reportCursor);
    };
  }, [view, ws, user]);
}
