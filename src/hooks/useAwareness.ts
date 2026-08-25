import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateUserAwareness, removeUserAwareness } from '../store/usersReducer';
import { WSMessage, ReconnectingWebSocket } from '../utils/websocketClient';

export const useAwareness = (ws: ReconnectingWebSocket) => {
  const dispatch = useDispatch();
  const localUser = useSelector((state: RootState) => state.user);

  // Broadcast local awareness whenever relevant fields change
  useEffect(() => {
    const payload = {
      id: localUser.id,
      name: localUser.name,
      color: localUser.color,
      cursor: localUser.cursor,
    };
    ws.send({ type: 'awareness', payload });
  }, [localUser.id, localUser.name, localUser.color, localUser.cursor, ws]);

  // Handle incoming awareness updates
  useEffect(() => {
    const handleMessage = (msg: WSMessage) => {
      if (msg.type !== 'awareness') return;
      const data = msg.payload;
      if (data.id === localUser.id) return; // ignore own updates
      dispatch(updateUserAwareness(data));
    };
    ws.on('message', handleMessage);
    return () => {
      ws.off('message', handleMessage);
    };
  }, [ws, dispatch, localUser.id]);

  // Cleanup awareness on disconnect
  useEffect(() => {
    const handleClose = () => {
      dispatch(removeUserAwareness(localUser.id));
    };
    ws.on('close', handleClose);
    return () => {
      ws.off('close', handleClose);
    };
  }, [ws, dispatch, localUser.id]);
};

export const broadcastAwareness = (ws: ReconnectingWebSocket) => {
  // Trigger a fresh awareness broadcast after reconnection
  ws.send({ type: 'awareness-request', payload: null });
};
