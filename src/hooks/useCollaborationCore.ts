import { useEffect, useRef, useState, useCallback } from "react";
import { useWebSocketCore } from "./useWebSocketCore";
import {
  CollaborationMessage,
  CollaborationMessageType,
} from "../types/collaborationMessage";
import { applyCRDT } from "../utils/conflictResolver";
import { UserPresence } from "../types/presence";

export interface CollaborationOptions {
  sessionId: string;
  username: string;
  color: string;
  wsUrl: string;
}

/**
 * Core collaboration hook.
 * - Queues local edits when offline and flushes on reconnect.
 * - Sends presence updates on join/leave and on reconnection.
 * - Applies incoming CRDT operations with deterministic conflict resolution.
 */
export const useCollaborationCore = ({
  sessionId,
  username,
  color,
  wsUrl,
}: CollaborationOptions) => {
  const { connected, sendMessage, setOnMessage } = useWebSocketCore({
    url: `${wsUrl}?session=${sessionId}`,
  });

  const [document, setDocument] = useState<string>("");
  const pendingOpsRef = useRef<CollaborationMessage[]>([]);
  const presenceRef = useRef<UserPresence>({
    id: "",
    name: username,
    color,
  });

  // Send join message once when component mounts
  useEffect(() => {
    const joinMsg: CollaborationMessage = {
      type: CollaborationMessageType.JOIN,
      sessionId,
      user: { name: username, color },
    };
    sendMessage(joinMsg);
  }, [sessionId, username, color, sendMessage]);

  // Flush pending ops when connection is (re)established
  useEffect(() => {
    if (connected && pendingOpsRef.current.length > 0) {
      pendingOpsRef.current.forEach((msg) => sendMessage(msg));
      pendingOpsRef.current = [];
    }
  }, [connected, sendMessage]);

  const handleIncoming = useCallback(
    (msg: CollaborationMessage) => {
      switch (msg.type) {
        case CollaborationMessageType.DOCUMENT:
          // Full document sync from server
          setDocument(msg.payload);
          break;
        case CollaborationMessageType.OPERATION:
          // Apply remote CRDT operation
          setDocument((prev) => applyCRDT(prev, msg.payload));
          break;
        case CollaborationMessageType.PRESENCE:
          // Presence updates are handled by UI layer
          break;
        default:
          break;
      }
    },
    []
  );

  // Register incoming handler
  useEffect(() => {
    setOnMessage(handleIncoming);
  }, [setOnMessage, handleIncoming]);

  // Public API to submit local edits
  const submitOperation = (op: any) => {
    const msg: CollaborationMessage = {
      type: CollaborationMessageType.OPERATION,
      sessionId,
      user: { name: username, color },
      payload: op,
    };
    if (connected) {
      sendMessage(msg);
    } else {
      pendingOpsRef.current.push(msg);
    }
    // Optimistically apply locally
    setDocument((prev) => applyCRDT(prev, op));
  };

  // Presence heartbeat – send cursor/selection updates
  const sendPresence = (presence: Partial<UserPresence>) => {
    const msg: CollaborationMessage = {
      type: CollaborationMessageType.PRESENCE,
      sessionId,
      user: { name: username, color },
      payload: presence,
    };
    if (connected) {
      sendMessage(msg);
    }
  };

  return {
    document,
    setDocument,
    submitOperation,
    sendPresence,
    connected,
  };
};