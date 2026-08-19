import { useEffect, useState } from "react";
import { AwarenessUser } from "../types";

/**
 * Hook to manage awareness (presence) data received via WebSocket.
 */
export function useAwareness(
  ws: WebSocket | null,
  localUser: AwarenessUser
) {
  const [users, setUsers] = useState<Record<string, AwarenessUser>>({});

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === "awareness") {
        setUsers((prev) => ({
          ...prev,
          [data.payload.id]: data.payload,
        }));
      } else if (data.type === "awareness-leave") {
        setUsers((prev) => {
          const copy = { ...prev };
          delete copy[data.payload.id];
          return copy;
        });
      }
    };

    ws.addEventListener("message", handleMessage);
    // Broadcast own presence once connection is ready
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "awareness", payload: localUser }));
    } else {
      ws.addEventListener("open", () => {
        ws.send(JSON.stringify({ type: "awareness", payload: localUser }));
      }, { once: true });
    }

    return () => {
      ws.removeEventListener("message", handleMessage);
    };
  }, [ws, localUser]);

  return users;
}
