import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateDocument } from '../store/editorReducer';
import { setUserAwareness } from '../store/usersReducer';

// Hook to initialize Yjs document and provider, and expose sync functions
export const useYjsCollaboration = (roomId: string, userId: string, userName: string, userColor: string) => {
  const ydocRef = useRef<Y.Doc>();
  const providerRef = useRef<WebsocketProvider>();
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize Yjs document
    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;

    // Connect to Yjs WebSocket server (assumes same origin WS endpoint /yjs)
    const provider = new WebsocketProvider(`${window.location.origin.replace(/^http/, 'ws')}/yjs`, roomId, ydoc, {
      // optional params
      connect: true,
      // awareness will be used for cursor tracking
    });
    providerRef.current = provider;

    // Set local awareness information
    provider.awareness.setLocalStateField('user', {
      id: userId,
      name: userName,
      color: userColor,
    });

    // Listen for remote document updates
    const yText = ydoc.getText('codemirror');
    const applyRemoteChanges = () => {
      const content = yText.toString();
      dispatch(updateDocument(content));
    };
    yText.observe(applyRemoteChanges);

    // Listen for awareness updates (cursor positions, etc.)
    const awarenessHandler = () => {
      const states = Array.from(provider.awareness.getStates().entries())
        .filter(([_, state]) => state && state.cursor)
        .map(([id, state]) => ({
          id,
          name: state.user?.name,
          color: state.user?.color,
          cursor: state.cursor,
        }));
      dispatch(setUserAwareness(states));
    };
    provider.awareness.on('change', awarenessHandler);

    // Cleanup on unmount
    return () => {
      yText.unobserve(applyRemoteChanges);
      provider.awareness.off('change', awarenessHandler);
      provider.disconnect();
      ydoc.destroy();
    };
  }, [roomId, userId, userName, userColor, dispatch]);

  // Function to apply local edits to the Yjs document
  const applyLocalChange = (newContent: string) => {
    if (!ydocRef.current) return;
    const yText = ydocRef.current.getText('codemirror');
    // Replace entire content – simple approach; for large docs consider diffing
    ydocRef.current.transact(() => {
      yText.delete(0, yText.length);
      yText.insert(0, newContent);
    });
  };

  // Function to update local cursor awareness
  const updateCursor = (cursor: { from: number; to: number }) => {
    if (!providerRef.current) return;
    providerRef.current.awareness.setLocalStateField('cursor', cursor);
  };

  return { applyLocalChange, updateCursor };
};