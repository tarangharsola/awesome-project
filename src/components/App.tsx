import React from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';
import ConnectionStatus from './ConnectionStatus';

/**
 * Root component assembling the UI.
 * Includes the language selector, connection status indicator,
 * the collaborative editor, and the active users panel.
 */
const App: React.FC = () => (
  <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <header
      className="app-header"
      style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', background: '#1e1e1e', color: '#fff' }}
    >
      <h1 style={{ margin: 0, fontSize: '1.25rem' }}>Collaborative Code Editor</h1>
      <LanguageSelector />
      <ConnectionStatus />
    </header>
    <main
      className="app-main"
      style={{ display: 'flex', flex: 1, overflow: 'hidden' }}
    >
      <section style={{ flex: 1, position: 'relative' }}>
        <Editor />
      </section>
      <aside style={{ width: '200px', borderLeft: '1px solid #333', background: '#2d2d2d', color: '#fff' }}>
        <UserList />
      </aside>
    </main>
  </div>
);

export default App;
