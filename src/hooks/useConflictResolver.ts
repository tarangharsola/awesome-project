import { useEffect, useRef } from 'react';
import WebSocketManager from '../utils/websocketClient';
import { WebSocketMessage } from '../types/websocketMessage';
import { useDispatch } from 'react-redux';
import { applyRemoteOps, applyLocalOp } from '../store/editorActions';

/**
 * Hook that resolves document conflicts using a simple operation queue.
 * Local operations are sent immediately when the connection is alive; otherwise they are queued.
 * Upon reconnection the queue is flushed and a state‑sync request is issued to guarantee convergence.
 */
export function useConflictResolver(wsManager: WebSocketManager) {
  const pendingOps = useRef<WebSocketMessage[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMessage = (msg: WebSocketMessage) => {
      if (msg.type === 'doc-op') {
        dispatch(applyRemoteOps(msg.payload));
      } else if (msg.type === 'state-sync') {
        // Full document state received after reconnection – replace local state.
        dispatch(applyRemoteOps(msg.payload));
      }
    };

    wsManager.addMessageHandler(handleMessage);

    wsManager.onStatusChange((status) => {
      if (status === 'connected' && pendingOps.current.length) {
        // Flush queued ops.
        pendingOps.current.forEach((op) => wsManager.send(op));
        pendingOps.current = [];
        // Ask server for the latest authoritative state.
        wsManager.send({ type: 'state-request', payload: {} });
      }
    });

    return () => {
      wsManager.removeMessageHandler(handleMessage);
    };
  }, [wsManager, dispatch]);

  const sendLocalOp = (op: any) => {
    const msg: WebSocketMessage = { type: 'doc-op', payload: op };
    if (wsManager) {
      wsManager.send(msg);
    } else {
      pendingOps.current.push(msg);
    }
    dispatch(applyLocalOp(op));
  };

  return { sendLocalOp };
}
