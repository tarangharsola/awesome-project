import { useCallback } from "react";
import { useWebSocketConnection } from "./useWebSocketConnection";
import { applyRemoteChanges, generateLocalChange } from "../utils/conflictResolver";
import { WebSocketMessage, WSMessageType } from "../types/websocketMessage";

export const useCollaboration = ({
  roomId,
  username,
  color,
  onRemoteChange,
}: {
  roomId: string;
  username: string;
  color: string;
  onRemoteChange: (content: string) => void;
}) => {
  const { sendMessage } = useWebSocketConnection({
    url: `${process.env.REACT_APP_WS_URL}/${roomId}`,
    onMessage: (msg: WebSocketMessage) => {
      if (msg.type === WSMessageType.DOCUMENT_CHANGE) {
        const updated = applyRemoteChanges(msg.payload);
        onRemoteChange(updated);
      }
    },
  });

  const broadcastChange = useCallback(
    (content: string) => {
      const change = generateLocalChange(content);
      sendMessage({
        type: WSMessageType.DOCUMENT_CHANGE,
        payload: change,
      });
    },
    [sendMessage]
  );

  return { broadcastChange };
};