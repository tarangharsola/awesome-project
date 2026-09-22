import { useEffect, useRef } from 'react';
import { getWebSocketClient } from '../utils/websocketClient';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { applyRemoteOperation } from '../utils/conflictResolver';
import { sendCursorUpdate, sendDocumentChange, requestDocumentSync } from '../utils/websocketMessageHelpers';
import { setDocumentContent, setRemoteCursor } from '../store/editorActions';
import { addUser, removeUser, updateUserPresence } from '../store/usersReducer';

export const useCollaboration = (roomId: string, username: string, userColor: string) => {
  const dispatch = useDispatch();
  const wsRef = useRef<any>(null);
  const editorContent = useSelector((state: RootState) => state.editor.content);
  const localCursor = useSelector((state: RootState) => state.editor.cursor);

  useEffect(() => {
    const ws = getWebSocketClient(`${process.env.REACT_APP_WS_URL}/${roomId}`);
    wsRef.current = ws;

    const handleOpen = () => {
      // announce presence
      ws.send({ type: 'join', username, color: userColor });
      // request latest document state (in case we reconnected)
      ws.send({ type: 'request_sync' });
    };

    const handleMessage = (msg: any) => {
      switch (msg.type) {
        case 'join':
          dispatch(addUser({ id: msg.id, name: msg.username, color: msg.color }));
          break;
        case 'leave':
          dispatch(removeUser(msg.id));
          break;
        case 'cursor':
          dispatch(setRemoteCursor({ userId: msg.id, position: msg.position }));
          break;
        case 'doc_change':
          const newContent = applyRemoteOperation(state => state.editor.content, msg.operation);
          dispatch(setDocumentContent(newContent));
          break;
        case 'sync':
          dispatch(setDocumentContent(msg.content));
          // also sync remote cursors if provided
          if (msg.cursors) {
            msg.cursors.forEach((c: any) => {
              dispatch(setRemoteCursor({ userId: c.id, position: c.position }));
            });
          }
          break;
        default:
          break;
      }
    };

    ws.on('open', handleOpen);
    ws.on('message', handleMessage);

    return () => {
      ws.off('open', handleOpen);
      ws.off('message', handleMessage);
      ws.send({ type: 'leave' });
    };
  }, [roomId, username, userColor, dispatch]);

  // Send local cursor updates
  useEffect(() => {
    if (!wsRef.current) return;
    const timer = setInterval(() => {
      wsRef.current.send({ type: 'cursor', position: localCursor });
    }, 200);
    return () => clearInterval(timer);
  }, [localCursor]);

  // Send document changes (debounced by the editor component itself)
  const sendChange = (operation: any) => {
    if (wsRef.current) wsRef.current.send({ type: 'doc_change', operation });
  };

  return { sendChange };
};