{"import React from 'react';
import { useWebSocket } from './useWebSocket';

function App() {
  const { connection, users, cursor } = useWebSocket();
  return (
    <div>
      <h1>Collaborative Code Editor</h1>
      <Editor connection={connection} users={users} cursor={cursor} />
      <UserList users={users} />
    </div>
  );
}

export default App;