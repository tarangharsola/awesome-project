import { useEffect, useState, useCallback, useRef } from "react";
import { useWebSocket } from "./useWebSocket";
import { v4 as uuidv4 } from "uuid";

type Cursor = { line: number; ch: number };

type User = {
  id: string;
  name: string;
  color: string;
  cursor?: Cursor;
};

/**
 * Hook that manages presence (join/leave) and cursor awareness for a collaborative room.
 * It guarantees that the local user's identity and latest cursor are re‑broadcast after any reconnection.
 */
export function useAwareness(roomId: string, username: string, color: string) {
  const wsUrl = `${process.env.REACT_APP_WS_URL}/${roomId}`;
  const { status, sendMessage } = useWebSocket(wsUrl);
  const [users, setUsers] = useState<Record<string, User>>({});
  const userIdRef = useRef<string>(uuidv4());

  // Send a join/presence message whenever the socket becomes connected.
  const broadcastJoin = useCallback(() => {
    const joinMsg = {
      type: "join",
      payload: {
        id: userIdRef.current,
        name: username,
        color,
      },
    };
    sendMessage(joinMsg);
  }, [sendMessage, username, color]);

  useEffect(() => {
    if (status === "connected") {
      broadcastJoin();
    }
  }, [status, broadcastJoin]);

  // Listen for all incoming WebSocket messages and update local awareness state.
  useEffect(() => {
    const handler = (e: Event) => {
      const raw = (e as CustomEvent).detail;
      let msg: any;
      try {
        msg = JSON.parse(raw);
      } catch {
        return; // ignore malformed messages
      }
      const { type, payload } = msg;
      switch (type) {
        case "join":
        case "presence":
          setUsers((prev) => ({
            ...prev,
            [payload.id]: { ...(prev[payload.id] || {}), ...payload },
          }));
          break;
        case "cursor":
          setUsers((prev) => ({
            ...prev,
            [payload.id]: {
              ...(prev[payload.id] || {}),
              cursor: payload.cursor,
            },
          }));
          break;
        case "leave":
          setUsers((prev) => {
            const copy = { ...prev };
            delete copy[payload.id];
            return copy;
          });
          break;
        default:
          // ignore unknown message types
          break;
      }
    };
    window.addEventListener("ws-message", handler);
    return () => window.removeEventListener("ws-message", handler);
  }, []);

  // Public API to broadcast the local cursor position.
  const broadcastCursor = useCallback(
    (cursor: Cursor) => {
      const cursorMsg = {
        type: "cursor",
        payload: {
          id: userIdRef.current,
          cursor,
        },
      };
      sendMessage(cursorMsg);
    },
    [sendMessage]
  );

  return { users, broadcastCursor, connectionStatus: status } as const;
}
