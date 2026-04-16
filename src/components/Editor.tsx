{"import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { WebSocket } from './WebSocket';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

function Editor() {
  const dispatch = useDispatch();
  const { code, cursorPosition } = useSelector((state) => state.editor);
  const { users } = useSelector((state) => state.users);
  const { ws } = useWebSocket();
  const { cursor } = useCursor();
  const { language } = useLanguage();
  const { username } = useUsers();

  useEffect(() => {
    dispatch({ type: 'UPDATE_CODE', payload: code });
  }, [code]);

  return (
    <div className='editor'>
      <WebSocket ws={ws} />
      <CursorTracker cursor={cursor} />
      <LanguageSelector language={language} />
      <UserList users={users} />
      <pre>{code}</pre>
    </div>
  );
}

export default Editor;