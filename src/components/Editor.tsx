{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';
import { useUsers } from './useUsers';
import { useReconnection } from './useReconnection';
import { useCursor } from './useCursor';
import AwarenessConsistency from './AwarenessConsistency';
import ConflictResolver from './ConflictResolver';
import CursorTracker from './CursorTracker';

interface EditorProps {
  roomId: string;
  language: string;
}

const Editor = ({ roomId, language }: EditorProps) => {
  const [editorState, setEditorState] = useState({
    cursorPositions: [],
    users: [],
    conflicts: [],
  });
  const { connect, disconnect, send } = useWebSocket(roomId);
  const { users } = useUsers();
  const { reconnectionStatus } = useReconnection();
  const { cursorPosition } = useCursor();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  useEffect(() => {
    if (reconnectionStatus === 'connected') {
      send({
        type: 'join',
        user: {
          name: 'John Doe',
          color: '#ff0000',
        },
      });
    }
  }, [reconnectionStatus]);

  useEffect(() => {
    if (cursorPosition) {
      setEditorState((prevState) => ({
        ...prevState,
        cursorPositions: [...prevState.cursorPositions, cursorPosition],
      }));
    }
  }, [cursorPosition]);

  return (
    <div>
      <AwarenessConsistency editor={{ state: editorState, setState: setEditorState }} />
      <ConflictResolver editor={{ state: editorState, setState: setEditorState }} />
      <CursorTracker editor={{ state: editorState, setState: setEditorState }} />
    </div>
  );
};

export default Editor;