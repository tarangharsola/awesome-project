import React, { useContext } from "react";
import { EditorContext } from "./Editor";
import { useWebSocket } from "../utils/hooks/useWebSocket";
import { useCursor } from "../utils/hooks/useCursor";
import { useUser } from "../utils/hooks/useUser";

/**
 * Component that wires the editor view with cursor broadcasting logic.
 * It renders nothing; its purpose is side‑effects only.
 */
export const CursorTracker: React.FC = () => {
  const { view } = useContext(EditorContext);
  const { user } = useUser();
  const [ws] = useWebSocket({ url: process.env.REACT_APP_WS_URL! });

  useCursor(view, ws, user);

  return null;
};
