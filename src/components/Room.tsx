import React from 'react';
import { useParams } from 'react-router-dom';
import { useWebSocket } from '../hooks/useWebSocket';
import { useCollaboration } from '../hooks/useCollaboration';
import Editor from './Editor';
import UserList from './UserList';
import LanguageSelector from './LanguageSelector';
import ConnectionStatus from './ConnectionStatus';

const Room: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { socket, status } = useWebSocket(roomId);
  const { document, applyRemoteChange, users, setLanguage } = useCollaboration(socket);

  return (
    <div className="room-container">
      <ConnectionStatus status={status} />
      <div className="main">
        <Editor
          content={document.content}
          onChange={applyRemoteChange}
          language={document.language}
          users={users}
        />
        <aside className="sidebar">
          <UserList users={users} />
          <LanguageSelector current={document.language} onSelect={setLanguage} />
        </aside>
      </div>
    </div>
  );
};

export default Room;