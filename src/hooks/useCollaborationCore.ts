import { useEffect, useRef } from 'react';
import { WebSocketMessage } from '../types/websocketMessage';
import { applyInsert, applyDelete } from '../utils/conflict/strategies/crdtOperations';
import { useWebSocket } from './useWebSocket';
import { DocumentState, CollaborationAction } from '../types/collaboration';

export function useCollaborationCore(
  docId: string,
  initialState: DocumentState,
  dispatch: React.Dispatch<CollaborationAction>
) {
  const { sendMessage, connectionStatus } = useWebSocket(docId);
  const pendingOps = useRef<Array<WebSocketMessage>>([]);

  useEffect(() => {
    if (connectionStatus === 'connected') {
      pendingOps.current.forEach(sendMessage);
      pendingOps.current = [];
    }
  }, [connectionStatus, sendMessage]);

  const handleRemoteMessage = (msg: WebSocketMessage) => {
    switch (msg.type) {
      case 'insert':
        dispatch({ type: 'APPLY_INSERT', payload: applyInsert(msg as any) });
        break;
      case 'delete':
        dispatch({ type: 'APPLY_DELETE', payload: applyDelete(msg as any) });
        break;
      default:
        break;
    }
  };

  const sendLocalInsert = (op: any) => {
    const msg = { type: 'insert', ...op } as WebSocketMessage;
    if (connectionStatus === 'connected') {
      sendMessage(msg);
    } else {
      pendingOps.current.push(msg);
    }
  };

  const sendLocalDelete = (op: any) => {
    const msg = { type: 'delete', ...op } as WebSocketMessage;
    if (connectionStatus === 'connected') {
      sendMessage(msg);
    } else {
      pendingOps.current.push(msg);
    }
  };

  return { sendLocalInsert, sendLocalDelete, handleRemoteMessage };
}
