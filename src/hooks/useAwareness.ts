import { useEffect } from "react";
import { useWebSocket } from "./useWebSocket";
import { WSMessage, WSMessageType } from "../types/websocket";

export const useAwareness = (
  roomId: string,
  user: { id: string; name: string; color: string }
) => {
  const { sendMessage, lastMessage } = useWebSocket(
    `${process.env.REACT_APP_WS_URL}/${roomId}`
  );

  // Broadcast presence on mount and cleanup on unmount
  useEffect(() => {
    const joinMsg: WSMessage = {
      type: WSMessageType.USER_JOIN,
      payload: {
        userId: user.id,
        username: user.name,
        color: user.color
      }
    };
    sendMessage(joinMsg);
    return () => {
      const leaveMsg: WSMessage = {
        type: WSMessageType.USER_LEAVE,
        payload: { userId: user.id }
      };
      sendMessage(leaveMsg);
    };
  }, [roomId, user, sendMessage]);

  // Expose the latest incoming message for other hooks/components
  return { lastMessage };
};