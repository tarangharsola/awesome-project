import { useEffect, useRef, useState } from "react";
import { useWebSocket } from "./useWebSocket";
import { CollaborationMessage, CollaborationMessageType } from "../types/collaborationMessage";
import { User } from "../types/presence";
import { handleCollaborationMessage } from "./useCollaborationCore";

export interface CollaborationHook {
  users: User[];
  localUser: User;
  sendOperation: (op: any) => void;
  applyRemoteOperation: (op: any) => void;
}

export function useCollaboration(roomId: string, username: string): CollaborationHook {
  const { socket, status } = useWebSocket(roomId);
  const [users, setUsers] = useState<User[]>([]);
  const localUserRef = useRef<User>({ id: generateId(), name: username, color: randomColor() });

  // Broadcast presence once the socket is ready
  useEffect(() => {
    if (socket && status === "connected") {
      const presenceMsg: CollaborationMessage = {
        type: CollaborationMessageType.PRESENCE,
        payload: { user: localUserRef.current }
      };
      socket.send(JSON.stringify(presenceMsg));
    }
  }, [socket, status]);

  // Handle incoming messages
  useEffect(() => {
    if (!socket) return;
    const handler = (event: MessageEvent) => {
      const msg: CollaborationMessage = JSON.parse(event.data);
      switch (msg.type) {
        case CollaborationMessageType.PRESENCE:
          // Full user list may be sent in payload.users
          if (msg.payload && "users" in msg.payload && msg.payload.users) {
            setUsers(msg.payload.users as User[]);
          }
          break;
        case CollaborationMessageType.OPERATION:
        case CollaborationMessageType.CURSOR:
          handleCollaborationMessage(msg, applyRemoteOperation);
          break;
        default:
          break;
      }
    };
    socket.addEventListener("message", handler);
    return () => socket.removeEventListener("message", handler);
  }, [socket]);

  const sendOperation = (op: any) => {
    if (!socket) return;
    const message: CollaborationMessage = {
      type: CollaborationMessageType.OPERATION,
      payload: { userId: localUserRef.current.id, operation: op }
    };
    socket.send(JSON.stringify(message));
  };

  const applyRemoteOperation = (op: any) => {
    // This function is a placeholder; the editor component will subscribe to it.
    // Keeping it here maintains a clear separation between networking and UI.
  };

  return {
    users,
    localUser: localUserRef.current,
    sendOperation,
    applyRemoteOperation
  };
}

// Simple utilities for ID and color generation
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
function randomColor(): string {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 50%)`;
}