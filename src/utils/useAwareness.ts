import { useEffect, useRef } from "react";
import { useWebSocket } from "./useWebSocket";
import { User } from "../types";

type AwarenessPayload = {
  type: "awareness";
  userId: string;
  username: string;
  color: string;
  cursor: { line: number; ch: number } | null;
};

/**
 * Hook that synchronises user presence (cursor position, name, colour) across
 * all participants in a room. It relies on the generic `useWebSocket` hook for
 * transport and keeps a local map of remote users.
 */
export function useAwareness(
  roomId: string,
  localUser: User,
  onUpdate: (users: Record<string, User & { cursor: any }>) => void
) {
  const awarenessMap = useRef<Record<string, User & { cursor: any }>>({});

  const { sendMessage } = useWebSocket(
    `${process.env.REACT_APP_WS_URL}/${roomId}`,
    (msg) => {
      if (msg.type !== "awareness") return;
      const payload = msg as AwarenessPayload;
      awarenessMap.current[payload.userId] = {
        id: payload.userId,
        name: payload.username,
        color: payload.color,
        cursor: payload.cursor,
      } as User & { cursor: any };
      onUpdate({ ...awarenessMap.current });
    },
    () => {
      // on open – announce ourselves
      sendMessage({
        type: "awareness",
        userId: localUser.id,
        username: localUser.name,
        color: localUser.color,
        cursor: null,
      } as AwarenessPayload);
    },
    () => {
      // on close – clear remote users (keep self for UI consistency)
      Object.keys(awarenessMap.current).forEach((id) => {
        if (id !== localUser.id) delete awarenessMap.current[id];
      });
      onUpdate({ ...awarenessMap.current });
    }
  );

  const broadcastCursor = (cursor: { line: number; ch: number } | null) => {
    sendMessage({
      type: "awareness",
      userId: localUser.id,
      username: localUser.name,
      color: localUser.color,
      cursor,
    } as AwarenessPayload);
  };

  useEffect(() => {
    // Cleanup: inform others we are leaving (cursor cleared)
    return () => {
      sendMessage({
        type: "awareness",
        userId: localUser.id,
        username: localUser.name,
        color: localUser.color,
        cursor: null,
      } as AwarenessPayload);
    };
  }, [sendMessage, localUser]);

  return { broadcastCursor };
}
