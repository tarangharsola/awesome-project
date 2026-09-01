import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { WebSocketClient } from '../utils/websocketClient';
import { RootState } from '../store';
import { updateUserPresence } from '../store/userActions';

/**
 * Hook that manages user awareness (presence) broadcasting and reception.
 * It sends the local user's info on join and on every reconnection, and updates the
 * Redux store when remote presence messages arrive.
 */
export function useAwareness(client: WebSocketClient) {
  const dispatch = useDispatch();
  const localUser = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const broadcastPresence = () => {
      client.send({
        type: 'USER_PRESENCE',
        payload: {
          id: localUser.id,
          name: localUser.name,
          color: localUser.color,
        },
      });
    };

    // Initial broadcast
    broadcastPresence();

    const handleMessage = (msg: any) => {
      if (msg.type === 'USER_PRESENCE' && msg.payload && msg.payload.id !== localUser.id) {
        dispatch(updateUserPresence(msg.payload));
      }
    };

    client.addMessageHandler(handleMessage);
    client.addOpenHandler(broadcastPresence);

    return () => {
      client.removeMessageHandler(handleMessage);
      client.removeOpenHandler(broadcastPresence);
    };
  }, [client, localUser, dispatch]);
}
