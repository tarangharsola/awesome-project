import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWebSocketConnection } from "./useWebSocketConnection";
import type { RootState } from "../store";
import { setDocument, applyRemoteOperation } from "../store/editorActions";
import type { CollaborationMessage } from "../types/collaboration";

export function useCollaboration(sessionId: string, username: string) {
  const dispatch = useDispatch();
  const editorState = useSelector((state: RootState) => state.editor);
  const pendingOpsRef = useRef<CollaborationMessage[]>([]);

  const handleMessage = useCallback(
    (msg: CollaborationMessage) => {
      switch (msg.type) {
        case "full-sync":
          dispatch(setDocument(msg.payload));
          break;
        case "operation":
          dispatch(applyRemoteOperation(msg.payload));
          break;
        case "presence":
          // Presence updates are handled by the user slice elsewhere
          break;
        default:
          break;
      }
    },
    [dispatch]
  );

  const { send, connected } = useWebSocketConnection({
    url: `${process.env.REACT_APP_WS_URL}?session=${sessionId}&user=${encodeURIComponent(username)}`,
    onMessage: handleMessage,
    reconnectAttempts: Infinity,
    reconnectDelay: 500,
  });

  const sendOperation = useCallback(
    (op) => {
      const msg = { type: "operation", payload: op } as CollaborationMessage;
      if (connected) {
        send(msg);
      } else {
        pendingOpsRef.current.push(msg);
      }
    },
    [send, connected]
  );

  // Flush pending ops and request latest state after reconnection
  useEffect(() => {
    if (connected && pendingOpsRef.current.length) {
      pendingOpsRef.current.forEach(send);
      pendingOpsRef.current = [];
      send({ type: "request-sync", payload: null } as CollaborationMessage);
    }
  }, [connected, send]);

  // Broadcast presence on mount / username change
  useEffect(() => {
    const presence = { type: "presence", payload: { username, color: "" } } as CollaborationMessage;
    send(presence);
  }, [send, username]);

  return { sendOperation };
}
