import { useEffect, useState } from "react";
import { useWebSocket } from "./useWebSocket";
import { usePresence } from "./usePresence";
import { applyRemoteChanges, localChangeToMessage } from "../utils/conflictResolver";
import { CollaborationMessage } from "../types/collaboration";

export function useCollaborationCore(roomId: string, username: string) {
  const [doc, setDoc] = useState<string>("");
  const ws = useWebSocket(roomId);
  const { users, broadcastPresence, updateUserPresence } = usePresence(username, ws);

  // Send local edits to the server
  const sendEdit = (delta: string) => {
    const msg: CollaborationMessage = localChangeToMessage(username, delta);
    ws?.send(JSON.stringify(msg));
  };

  // Handle incoming WebSocket messages
  useEffect(() => {
    if (!ws) return;
    const handleMessage = (event: MessageEvent) => {
      const msg: CollaborationMessage = JSON.parse(event.data);
      if (msg.type === "edit" && msg.author !== username) {
        setDoc((prev) => applyRemoteChanges(prev, msg));
      } else if (msg.type === "presence") {
        updateUserPresence(msg);
      }
    };
    ws.addEventListener("message", handleMessage);
    return () => ws.removeEventListener("message", handleMessage);
  }, [ws, username, updateUserPresence]);

  // Broadcast presence when the connection is ready
  useEffect(() => {
    if (ws) {
      broadcastPresence();
    }
  }, [ws, broadcastPresence]);

  return { doc, setDoc, sendEdit, users };
}
