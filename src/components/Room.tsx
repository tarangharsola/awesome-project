import React, { useState } from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';

type RoomProps = {
  roomId: string;
};

const Room: React.FC<RoomProps> = ({ roomId }) => {
  const [language, setLanguage] = useState<string>('javascript');

  return (
    <div className="room-container" style={{ display: 'flex', height: '100vh' }}>
      <div className="sidebar" style={{ width: '200px', borderRight: '1px solid #444' }}>
        <LanguageSelector language={language} onChange={setLanguage} />
        <UserList roomId={roomId} />
      </div>
      <div className="editor-pane" style={{ flexGrow: 1 }}>
        <Editor language={language} roomId={roomId} />
      </div>
    </div>
  );
};

export default Room;