import { useEffect } from "react";
import { useWebSocket, WebSocketStatus } from "./useWebSocket";
import { useUsers } from "./useUsers";

type AwarenessPayload = {
  type: "awareness";
  userId: string;
  username: string;
  color: string;
  cursor?: { line: number; ch: number };
};

export const useAwareness = (
  url: string,
  user: { id: string; name: string; color: string }
) => {
  const { sendMessage, status } = useWebSocket(url, {
    onMessage: (msg) => {
      if (msg.type === "awareness") {
        updateUserAwareness(msg);
      }
    },
  });

  const { updateUserAwareness } = useUsers();

  // Announce presence each time the socket becomes connected
  useEffect(() => {
    if (status === "connected") {
      const payload: AwarenessPayload = {
        type: "awareness",
        userId: user.id,
        username: user.name,
        color: user.color,
      };
      sendMessage(payload);
    }
  }, [status, sendMessage, user]);

  // Helper to broadcast cursor position changes
  const broadcastCursor = (cursor: { line: number; ch: number }) => {
    const payload: AwarenessPayload = {
      type: "awareness",
      userId: user.id,
      username: user.name,
      color: user.color,
      cursor,
    };
    sendMessage(payload);
  };

  return { broadcastCursor, connectionStatus: status as WebSocketStatus };
};