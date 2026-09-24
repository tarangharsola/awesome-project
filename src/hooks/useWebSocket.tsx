import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useWebSocketConnection } from './useWebSocketConnection';
import type { RootState } from '../store';

// Placeholder action dispatcher – replace with real actions as needed
// import { handleIncomingMessage } from '../store/actions';

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const roomId = useSelector((state: RootState) => state.room?.id);

  const url = useMemo(() => {
    const base = process.env.REACT_APP_WS_URL || '';
    return `${base}/${roomId ?? ''}`;
  }, [roomId]);

  const { status, sendMessage } = useWebSocketConnection({
    url,
    onMessage: (msg) => {
      // Dispatch actions based on incoming message types
      // dispatch(handleIncomingMessage(msg));
    },
  });

  return { status, sendMessage } as const;
};
