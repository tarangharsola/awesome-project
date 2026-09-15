import { useEffect, useRef } from "react";
import { useWebSocket } from "./useWebSocket";
import type { User } from "../types";
import type { WebSocketMessage } from "../types/websocketMessage";

type AwarenessProps = {
  roomId: string;
  user: User;
  onUsersUpdate: (users: Record<string, User>) => void;
};

/**
 * Manages presence (awareness) of participants in a collaborative room.
 * It broadcasts the local user's identity on connection and cleans up on
 * unload. Remote presence messages update the shared user map which is
 * reported via `onUsersUpdate`.
 */
export const useAwareness = ({ roomId, user, onUsersUpdate }: AwarenessProps) => {
  const usersRef = useRef<Record<string, User>>({});

  const { connected, sendMessage } = useWebSocket({
    url: `${process.env.REACT_APP_WS_URL}?room=${roomId}`,
    onMessage: handleMessage,
  });

  function broadcastPresence() {
    const msg: WebSocketMessage = {
      type: "presence",
      payload: { userId: user.id, name: user.name, color: user.color },
    };
    sendMessage(msg);
  }

  function handleMessage(msg: WebSocketMessage) {
    if (msg.type === "presence") {
      const { userId, name, color } = msg.payload;
      usersRef.current[userId] = { id: userId, name, color };
      onUsersUpdate({ ...usersRef.current });
    } else if (msg.type === "presence-leave") {
      const { userId } = msg.payload;
      delete usersRef.current[userId];
      onUsersUpdate({ ...usersRef.current });
    }
  }

  // Broadcast our presence whenever the socket becomes ready
  useEffect(() => {
    if (connected) {
      broadcastPresence();
    }
  }, [connected, user]);

  // Ensure we notify the server when the user leaves (tab close / refresh)
  useEffect(() => {
    const leave = () => {
      const msg: WebSocketMessage = {
        type: "presence-leave",
        payload: { userId: user.id },
      };
      sendMessage(msg);
    };
    window.addEventListener("beforeunload", leave);
    return () => {
      window.removeEventListener("beforeunload", leave);
      leave();
    };
  }, [user, sendMessage]);

  return { users: usersRef.current };
};