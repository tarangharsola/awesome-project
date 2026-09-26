import { useEffect, useRef, useState } from "react";
import { useWebSocket } from "./useWebSocket";
import { resolveConflict, Operation } from "../utils/conflictResolver";
import { User, Cursor } from "../types";

export function useCollaboration(roomId: string, username: string, color: string) {
  const { sendMessage, addMessageListener, status } = useWebSocket(`${process.env.REACT_APP_WS_URL}/${roomId}`);
  const [doc, setDoc] = useState<string>("");
  const [users, setUsers] = useState<Record<string, User>>({});
  const pendingOpsRef = useRef<Operation[]>([]);

  // Join room when connected
  useEffect(() => {
    if (status === "connected") {
      sendMessage({ type: "join", username, color, userId: generateId() });
    }
  }, [status, username, color, sendMessage]);

  // Listen for incoming messages
  useEffect(() => {
    const unsubscribe = addMessageListener((msg) => {
      switch (msg.type) {
        case "join":
          setUsers((prev) => ({ ...prev, [msg.userId]: { username: msg.username, color: msg.color, cursor: null } }));
          break;
        case "leave":
          setUsers((prev) => {
            const copy = { ...prev };
            delete copy[msg.userId];
            return copy;
          });
          break;
        case "cursor":
          setUsers((prev) => ({
            ...prev,
            [msg.userId]: { ...(prev[msg.userId] || {}), cursor: msg.cursor },
          }));
          break;
        case "operation":
          setDoc((current) => resolveConflict(current, msg.operation));
          break;
        case "sync_request":
          sendMessage({ type: "sync_response", doc, users });
          break;
        case "sync_response":
          setDoc(msg.doc);
          setUsers(msg.users);
          break;
        default:
          break;
      }
    });
    return unsubscribe;
  }, [addMessageListener, sendMessage, doc, users]);

  // Request full sync after reconnection
  useEffect(() => {
    if (status === "connected") {
      sendMessage({ type: "sync_request" });
    }
  }, [status, sendMessage]);

  const applyLocalOperation = (op: Operation) => {
    setDoc((current) => resolveConflict(current, op));
    pendingOpsRef.current.push(op);
    sendMessage({ type: "operation", operation: op });
  };

  const updateCursor = (cursor: Cursor) => {
    sendMessage({ type: "cursor", cursor });
  };

  return { doc, users, applyLocalOperation, updateCursor, status };
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
