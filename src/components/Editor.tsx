{"import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { WebSocket } from './WebSocket';

const Editor = () => {
  const dispatch = useDispatch();
  const code = useSelector((state) => state.editor.code);
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      dispatch({ type: 'UPDATE_CODE', payload: event.data });
    };
    return () => ws.close();
  }, []);

  return (
    <div>
      <WebSocket users={users} />
      <textarea value={code} onChange={(e) => dispatch({ type: 'UPDATE_CODE', payload: e.target.value })} />
    </div>
  );
};

export default Editor;