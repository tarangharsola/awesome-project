import React from 'react';
import { Editor } from './Editor';
import { LanguageSelector } from './LanguageSelector';
import { UserList } from './UserList';
import { WebSocketProvider } from './WebSocket';

// Adjust the WebSocket URL as appropriate for your environment.
const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:4000';

export const App: React.FC = () => (
  <WebSocketProvider url={WS_URL}>
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#1e1e1e', color: '#fff' }}>
      <aside style={{ width: '200px', borderRight: '1px solid #333', padding: '1rem' }}>
        <UserList />
        <LanguageSelector />
      </aside>
      <main style={{ flexGrow: 1, padding: '1rem' }}>
        <Editor />
      </main>
    </div>
  </WebSocketProvider>
);
