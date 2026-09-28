import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWebSocket } from "./useWebSocket";
import { RootState } from "../store";
import { setUsers } from "../store/usersReducer";

export function usePresence(sessionId: string) {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);
  const { sendMessage, isConnected } = useWebSocket(
    `${process.env.REACT_APP_WS_URL}?session=${sessionId}&presence=1`,
    (msg) => {
      if (msg.type === "presenceUpdate") {
        dispatch(setUsers(msg.payload));
      }
    }
  );

  // Request the current presence list whenever we (re)connect
  useEffect(() => {
    if (isConnected) {
      sendMessage({ type: "presenceRequest" });
    }
  }, [isConnected, sendMessage]);

  return { users };
}
