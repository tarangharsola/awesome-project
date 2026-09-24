import React, { useState, useEffect } from "react";
import { useWebSocketConnection } from "../hooks/useWebSocketConnection";
import { WebSocketMessage, WSMessageType } from "../types/websocketMessage";
import UserList from "./UserList";
import Editor from "./Editor";

interface RoomProps {
  roomId: string;
  username: string;
  color: string;
}

const Room: React.FC<RoomProps> = ({ roomId, username, color }) => {
  const [users, setUsers] = useState<Array<{ id: string; name: string; color: string }>>([]);
  const [connected, setConnected] = useState(false);

  const handleMessage = (msg: WebSocketMessage) => {
    switch (msg.type) {
      case WSMessageType.USER_JOIN:
        setUsers((prev) => [...prev, msg.payload]);
        break;
      case WSMessageType.USER_LEAVE:
        setUsers((prev) => prev.filter((u) => u.id !== msg.payload.id));
        break;
      case WSMessageType.USER_LIST:
        setUsers(msg.payload);
        break;
      default:
        break;
    }
  };

  const { sendMessage } = useWebSocketConnection({
    url: `${process.env.REACT_APP_WS_URL}/${roomId}`,
    onMessage: handleMessage,
    onOpen: () => setConnected(true),
    onClose: () => setConnected(false),
  });

  // Notify server of current user when connection is ready
  useEffect(() => {
    if (connected) {
      sendMessage({
        type: WSMessageType.USER_JOIN,
        payload: { id: roomId, name: username, color },
      });
    }
  }, [connected, sendMessage, roomId, username, color]);

  return (
    <div className="room">
      <UserList users={users} />
      <Editor roomId={roomId} username={username} color={color} sendMessage={sendMessage} />
    </div>
  );
};

export default Room;