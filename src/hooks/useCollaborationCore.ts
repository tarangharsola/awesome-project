import { useEffect, useRef, useState } from 'react';
import { useWebSocket } from './useWebSocket';
import { Operation } from '../types/collaboration';
import { applyLocalOperation, applyRemoteOperation } from '../utils/conflict/strategies/crdtCore';

/**
 * Core collaboration hook handling document state, user presence, and
 * reliable operation ordering using a simple sequence number based CRDT.
 */
export function useCollaborationCore(
  roomId: string,
  userId: string,
  username: string,
  color: string
) {
  const [doc, setDoc] = useState<string>('');
  const [users, setUsers] = useState<
    Record<string, { name: string; color: string; cursor?: number }>
  >({});

  const pendingOps = useRef<Operation[]>([]);
  const lastSeq = useRef<number>(0);

  const { send, connected } = useWebSocket(
    `wss://example.com/collab/${roomId}`,
    handleMessage
  );

  function handleMessage(msg: any) {
    switch (msg.type) {
      case 'init':
        setDoc(msg.content);
        setUsers(msg.users);
        lastSeq.current = msg.seq ?? 0;
        // resend any ops that were queued while disconnected
        pendingOps.current.forEach((op) => send(op));
        break;
      case 'operation':
        if (msg.seq <= lastSeq.current) return; // ignore duplicates/out‑of‑order
        const newDoc = applyRemoteOperation(doc, msg as Operation);
        setDoc(newDoc);
        lastSeq.current = msg.seq;
        break;
      case 'presence':
        setUsers((prev) => ({
          ...prev,
          [msg.userId]: {
            name: msg.name,
            color: msg.color,
            cursor: msg.cursor,
          },
        }));
        break;
      case 'presenceLeave':
        setUsers((prev) => {
          const copy = { ...prev };
          delete copy[msg.userId];
          return copy;
        });
        break;
      case 'syncRequest':
        send({ type: 'syncResponse', content: doc, seq: lastSeq.current });
        break;
      case 'syncResponse':
        setDoc(msg.content);
        lastSeq.current = msg.seq;
        break;
      default:
        break;
    }
  }

  // announce ourselves when the socket becomes ready
  useEffect(() => {
    if (connected) {
      send({ type: 'join', userId, name: username, color });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, userId, username, color]);

  const applyOperation = (op: Operation) => {
    const newDoc = applyLocalOperation(doc, op);
    setDoc(newDoc);
    const opMessage = {
      ...op,
      type: 'operation',
      userId,
      seq: ++lastSeq.current,
    } as Operation & { type: string; userId: string; seq: number };
    pendingOps.current.push(opMessage);
    send(opMessage);
  };

  const updateCursor = (pos: number) => {
    send({ type: 'presence', userId, name: username, color, cursor: pos });
  };

  return { doc, users, applyOperation, updateCursor, connected };
}
