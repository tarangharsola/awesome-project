import { useEffect, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { Awareness } from "y-protocols/awareness";
import { User } from "../types";

export interface CollaborationState {
  ydoc: Y.Doc;
  provider: WebsocketProvider;
  awareness: Awareness;
  users: Map<number, User>;
  localUserId: number;
  connected: boolean;
}

/**
 * Central hook that manages WebSocket connection, Yjs document, awareness (user list),
 * and connection status for a collaborative editing session.
 *
 * @param sessionId Unique identifier for the collaborative room (derived from shareable URL).
 * @param username Display name of the local user.
 * @param color Hex color string assigned to the local user.
 */
export function useCollaboration(sessionId: string, username: string, color: string) {
  const [state, setState] = useState<CollaborationState | null>(null);

  useEffect(() => {
    // Initialise Yjs document and WebSocket provider.
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(import.meta.env.VITE_WS_URL, sessionId, ydoc);
    const awareness = provider.awareness;

    // Set local user information for awareness.
    const localUserId = awareness.clientID;
    awareness.setLocalStateField("user", { name: username, color } as User);

    // Maintain a map of connected users.
    const users = new Map<number, User>();
    const syncUsers = () => {
      awareness.getStates().forEach((state, clientId) => {
        const user = (state as any).user as User | undefined;
        if (user) {
          users.set(clientId, user);
        } else {
          users.delete(clientId);
        }
      });
      setState(prev => (prev ? { ...prev, users } : null));
    };

    // Listen for awareness changes (join/leave, name/color updates).
    awareness.on("change", syncUsers);
    // Listen for connection status changes.
    const statusHandler = ({ status }: { status: string }) => {
      setState(prev => (prev ? { ...prev, connected: status === "connected" } : null));
    };
    provider.on("status", statusHandler);

    // Initialise state.
    setState({
      ydoc,
      provider,
      awareness,
      users,
      localUserId,
      connected: provider.wsconnected
    });

    // Cleanup on unmount.
    return () => {
      awareness.off("change", syncUsers);
      provider.off("status", statusHandler);
      provider.disconnect();
      ydoc.destroy();
    };
  }, [sessionId, username, color]);

  return state;
}
