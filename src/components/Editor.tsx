{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import { useWebSocket } from '../utils/useWebSocket';
import { useUsers } from '../utils/useUsers';
import { useCursor } from '../utils/useCursor';

interface Props {
  roomId: string;
  language: string;
}

const Editor: React.FC<Props> = ({ roomId, language }) => {
  const [code, setCode] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [users, setUsers] = useState({} as any);
  const [cursors, setCursors] = useState({} as any);

  const { sendCode, receiveCode } = useEditor(roomId);
  const { joinRoom, leaveRoom } = useWebSocket(roomId);
  const { users: userUsers } = useUsers(roomId);
  const { cursors: cursorCursors } = useCursor(roomId);

  useEffect(() => {
    joinRoom();
  }, []);

  useEffect(() => {
    if (userUsers) setUsers(userUsers);
  }, [userUsers]);

  useEffect(() => {
    if (cursorCursors) setCursors(cursorCursors);
  }, [cursorCursors]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    sendCode(newCode);
 );

  const handleCursorPositionChange = (newCursorPosition: number) => {
    setCursorPosition(newCursorPosition);
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
      />
      <div>
        {Object.keys(users).map((userId) => (
          <CursorTracker
            key={userId}
            userId={userId}
            cursorPosition={cursors[userId].position}
            color={users[userId].color}
          />
        ))}
      </div>
    </div>
  );
}

export default Editor;