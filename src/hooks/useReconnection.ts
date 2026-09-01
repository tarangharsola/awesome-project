import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { WebSocketClient } from '../utils/websocketClient';
import { syncDocument } from '../store/editorActions';
import { EditorState } from '../types/editor';

/**
 * Hook that ensures the client receives the latest document state after a reconnection.
 * It listens for SYNC_DOCUMENT messages and dispatches them to the Redux store.
 */
export function useReconnection(client: WebSocketClient) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMessage = (msg: any) => {
      if (msg.type === 'SYNC_DOCUMENT' && msg.payload) {
        const state: EditorState = msg.payload;
        dispatch(syncDocument(state));
      }
    };

    client.addMessageHandler(handleMessage);
    return () => {
      client.removeMessageHandler(handleMessage);
    };
  }, [client, dispatch]);
}
