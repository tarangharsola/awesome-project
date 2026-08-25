import { useEffect, useRef } from 'react';
import { ReconnectingWebSocket, WSMessage } from '../utils/websocketClient';
import { useDispatch } from 'react-redux';
import { setConnectionStatus } from '../store/userReducer';
import { syncDocument } from '../store/editorReducer';
import { broadcastAwareness } from './useAwareness';

export const useReconnection = (url: string) => {
  const dispatch = useDispatch();
  const wsRef = useRef<ReconnectingWebSocket | null>(null);

  useEffect(() => {
    const ws = new ReconnectingWebSocket(url);
    wsRef.current = ws;

    const handleOpen = () => {
      dispatch(setConnectionStatus('connected'));
      ws.send({ type: 'request-sync', payload: null });
      broadcastAwareness(ws);
    };

    const handleClose = () => {
      dispatch(setConnectionStatus('disconnected'));
    };

    const handleMessage = (msg: WSMessage) => {
      if (msg.type === 'sync') {
        dispatch(syncDocument(msg.payload));
      }
    };

    ws.on('open', handleOpen);
    ws.on('close', handleClose);
    ws.on('message', handleMessage);

    return () => {
      ws.close();
    };
  }, [url, dispatch]);
};
