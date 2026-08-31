import React from "react";
import { Editor } from "./Editor";
import { LanguageSelector } from "./LanguageSelector";
import { UserList } from "./UserList";
import { ConnectionStatus } from "./ConnectionStatus";
import { useWebSocket } from "../hooks/useWebSocket";

export const App: React.FC = () => {
  const { status, sendMessage } = useWebSocket({
    url: `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/ws`,
  });

  return (
    <div className="app-container">
      <header className="app-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 1rem" }}>
        <h1 style={{ margin: 0 }}>Collaborative Code Editor</h1>
        <ConnectionStatus status={status} />
      </header>
      <main className="app-main" style={{ display: "flex", height: "calc(100vh - 60px)" }}>
        <aside className="sidebar" style={{ width: 200, borderRight: "1px solid #444", padding: "1rem", boxSizing: "border-box" }}>
          <UserList />
          <LanguageSelector />
        </aside>
        <section className="editor-section" style={{ flex: 1, padding: "1rem", boxSizing: "border-box" }}>
          {/* Editor component receives sendMessage to broadcast local changes */}
          <Editor sendMessage={sendMessage} />
        </section>
      </main>
    </div>
  );
};