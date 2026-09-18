import { useEffect } from "react";
import { useWebSocket, WebSocketStatus } from "./useWebSocket";
import { useUsers } from "./useUsers";
import { useCursor } from "./useCursor";
import { WebSocketMessage, MessageType } from "../types/websocketMessage";

/**
 * Hook that synchronises user presence (join/leave) and cursor positions across
 * all participants in a room. It relies on the resilient WebSocket hook.
 */
export const useAwareness = (
  roomId: string,
  username: string,
  color: string
) => {
  const { status, sendMessage } = useWebSocket(
    `wss://example.com/rooms/${roomId}`,
    handleMessage
  );
  const { users, addUser, updateUser, removeUser } = useUsers();
  const { cursor, setCursor } = useCursor();

  // Broadcast own join information once the socket is ready
  useEffect(() => {
    if (status === "connected") {
      const joinMsg: WebSocketMessage = {
        type: MessageType.JOIN,
        payload: { username, color, cursor },
      };
      sendMessage(joinMsg);
    }
  }, [status, username, color, cursor, sendMessage]);

  // Broadcast cursor updates (debounced to avoid flooding)
  useEffect(() => {
    if (status !== "connected") return;
    const timer = setTimeout(() => {
      const cursorMsg: WebSocketMessage = {
        type: MessageType.CURSOR,
        payload: { username, color, cursor },
      };
      sendMessage(cursorMsg);
    }, 100);
    return () => clearTimeout(timer);
  }, [cursor, status, username, color, sendMessage]);

  function handleMessage(msg: WebSocketMessage) {
    switch (msg.type) {
      case MessageType.JOIN:
        addUser(msg.payload);
        break;
      case MessageType.LEAVE:
        removeUser(msg.payload.username);
        break;
      case MessageType.CURSOR:
        updateUser(msg.payload);
        break;
      case MessageType.SYNC:
        // Document sync is handled by editor hooks; no action needed here
        break;
      default:
        break;
    }
  }

  // Notify server when the local user leaves (unmount)
  useEffect(() => {
    return () => {
      if (status === "connected") {
        const leaveMsg: WebSocketMessage = {
          type: MessageType.LEAVE,
          payload: { username },
        };
        sendMessage(leaveMsg);
      }
    };
  }, [status, username, sendMessage]);

  return {
    users,
    cursor,
    setCursor,
    connectionStatus: status as WebSocketStatus,
  } as const;
};