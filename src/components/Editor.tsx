{"import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { WebSocket } from './WebSocket';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

const Editor = () => {
  const dispatch = useDispatch();
  const { code, language } = useSelector((state) => state.editor);
  const { users, user } = useSelector((state) => state.users);
  const { ws } = useWebSocket();

  useEffect(() => {
    ws.onmessage = (event) => {
      dispatch({ type: 'UPDATE_CODE', payload: event.data });
    };
  }, [ws, dispatch]);

  const handleCodeChange = (newCode) => {
    dispatch({ type: 'UPDATE_CODE', payload: newCode });
  };

  return (
    <div>
      <WebSocket ws={ws} />
      <textarea value={code} onChange={(e) => handleCodeChange(e.target.value)} />
      <LanguageSelector language={language} onChange={(newLanguage) => dispatch({ type: 'UPDATE_LANGUAGE', payload: newLanguage })} />
      <UserList users={users} user={user} />
    </div>
  );
};

export default Editor;