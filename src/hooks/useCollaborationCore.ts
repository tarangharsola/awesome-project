import { useEffect, useRef, useState } from "react";
import { useWebSocket, WebSocketStatus } from "./useWebSocket";
import type { CollaborationMessage } from "../types/collaborationMessage";
import type { EditorChange } from "../types/editor";
import { applyRemoteChange, generateLocalChange } from "../utils/conflictResolver";

let localIdCounter = 0;
const generateId = () => `${Date.now()}-${localIdCounter++}`;

export const useCollaborationCore = (roomId: string, username: string, color: string) => {
  const [doc, setDoc] = useState<string>("");
  const pendingOps = useRef<CollaborationMessage[]>([]);
  const { status, send } = useWebSocket(
    `${process.env.REACT_APP_WS_URL}/rooms/${roomId}`,
    handleMessage
  );

  function handleMessage(msg: CollaborationMessage) {
    switch (msg.type) {
      case "full-sync":
        setDoc(msg.payload.content);
        pendingOps.current = [];
        break;
      case "change":
        setDoc((prev) => applyRemoteChange(prev, msg.payload));
        break;
      case "presence":
        // Presence updates are handled by the presence hook/component
        break;
      default:
        break;
    }
  }

  const applyLocalChange = (change: EditorChange) => {
    const opId = generateId();
    const msg: CollaborationMessage = {
      type: "change",
      id: opId,
      user: { name: username, color },
      payload: generateLocalChange(change, opId),
    };
    // Optimistic UI update
    setDoc((prev) => applyRemoteChange(prev, msg.payload));
    pendingOps.current.push(msg);
    send(msg);
  };

  // Request a full document sync when the connection (re)establishes
  useEffect(() => {
    if (status === "connected") {
      const syncMsg: CollaborationMessage = {
        type: "request-sync",
        id: generateId(),
        user: { name: username, color },
        payload: null,
      };
      send(syncMsg);
    }
  }, [status, send, username, color]);

  // Resend any pending operations after reconnection
  useEffect(() => {
    if (status === "connected" && pendingOps.current.length > 0) {
      pendingOps.current.forEach((op) => send(op));
    }
  }, [status, send]);

  return { doc, applyLocalChange, connectionStatus: status as WebSocketStatus };
};