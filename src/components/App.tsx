import React from "react";
import { Editor } from "./Editor";
import { UserList } from "./UserList";
import { LanguageSelector } from "./LanguageSelector";
import { ConnectionStatus } from "./ConnectionStatus";
import { useWebSocket } from "../hooks/useWebSocket";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "ws://localhost:4000";

export const App: React.FC = () => {
  const { sendMessage, status, reconnect } = useWebSocket({ url: SOCKET_URL });

  return (
    <div className="app-container">
      <ConnectionStatus status={status} onRetry={reconnect} />
      <div className="main-layout">
        <aside className="sidebar">
          <UserList />
          <LanguageSelector />
        </aside>
        <main className="editor-pane">
          <Editor sendMessage={sendMessage} connectionStatus={status} />
        </main>
      </div>
    </div>
  );
};