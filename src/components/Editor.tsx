import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editorReducer } from '../store/editorReducer';
import { useWebSocket } from '../hooks/useWebSocket';
import { useLanguage } from '../utils/useLanguage';
import { useAwareness } from '../hooks/useAwareness';
import { RootState } from '../store';
import { setContent } from '../store/editorActions';

export const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.editor.content);
  const language = useSelector((state: RootState) => state.editor.language);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { sendMessage, status } = useWebSocket({
    url: `${process.env.REACT_APP_WS_URL}/session/${window.location.pathname.slice(1)}`,
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'remote-edit') {
        dispatch({ type: 'REMOTE_EDIT', payload: { content: data.payload.content, timestamp: data.payload.timestamp } });
      } else if (data.type === 'sync-response') {
        dispatch(setContent(data.payload.content));
      }
    },
  });

  // Awareness (cursor & user list) – only needed for side‑effects, UI handled elsewhere
  useAwareness({
    username: window.localStorage.getItem('username') || 'Anonymous',
    color: window.localStorage.getItem('color') || '#'+Math.floor(Math.random()*16777215).toString(16),
    wsUrl: `${process.env.REACT_APP_WS_URL}/session/${window.location.pathname.slice(1)}`,
    onUsersUpdate: () => {},
  });

  // Emit local edits
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    dispatch({ type: 'LOCAL_EDIT', payload: { content: newContent } });
    sendMessage({
      type: 'local-edit',
      payload: { content: newContent, timestamp: Date.now() },
    });
  };

  // Sync initial content when component mounts
  useEffect(() => {
    if (status === 'connected') {
      sendMessage({ type: 'sync-request' });
    }
  }, [status, sendMessage]);

  // Apply syntax highlighting via simple CSS class (placeholder for real editor like Monaco)
  const { setLanguage } = useLanguage();
  useEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);

  return (
    <textarea
      ref={textareaRef}
      value={content}
      onChange={handleChange}
      className={`editor ${language}`}
      spellCheck={false}
    />
  );
};
