import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useWebSocket } from "./useWebSocket";
import { applyRemoteOperation, setDocument } from "../store/editorActions";

export function useCollaboration(sessionId: string, user: { name: string; color: string }) {
  const dispatch = useDispatch();
  const { sendMessage, isConnected } = useWebSocket(
    `${process.env.REACT_APP_WS_URL}?session=${sessionId}`,
    (msg) => {
      switch (msg.type) {
        case "operation":
          dispatch(applyRemoteOperation(msg.payload));
          break;
        case "fullSync":
          dispatch(setDocument(msg.payload));
          break;
        default:
          break;
      }
    }
  );

  // Queue of local operations that have been sent but may need retransmission
  const pendingOps = useRef<any[]>([]);

  const submitOperation = (op: any) => {
    pendingOps.current.push(op);
    sendMessage({ type: "operation", payload: op });
  };

  // When the connection (re)establishes, request a fresh document state and resend pending ops
  useEffect(() => {
    if (isConnected) {
      sendMessage({ type: "requestFullSync" });
      pendingOps.current.forEach((op) => {
        sendMessage({ type: "operation", payload: op });
      });
    }
  }, [isConnected, sendMessage]);

  // Broadcast presence on (re)connect
  useEffect(() => {
    if (isConnected) {
      sendMessage({ type: "presence", payload: { user } });
    }
  }, [isConnected, user, sendMessage]);

  return { submitOperation };
}
