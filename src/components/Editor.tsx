{"import React from 'react';
import { useCursor, useReconnection, useUsers } from './use*';

interface EditorProps {
  roomId: string;
}

const Editor: React.FC<EditorProps> = ({ roomId }) => {
  const cursor = useCursor(roomId);
  const reconnection = useReconnection(roomId);
  const users = useUsers(roomId);
  return (
    <div>
      <CursorTracker roomId={roomId} />
      <ConflictResolver roomId={roomId} />
      <AwarenessConsistency roomId={roomId} />
      <ReconnectionHandler roomId={roomId} />
      <UserList roomId={roomId} />
    </div>
  );
};

export default Editor;