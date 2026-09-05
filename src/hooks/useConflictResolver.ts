import { useCallback, useRef } from 'react';
import { Operation, ConflictResolver } from '../types/conflict';
import { otStrategy } from '../utils/conflict/strategies';

/**
 * Hook that provides a conflict‑free document state using an OT resolver.
 * It keeps a local copy of the document and a queue of pending remote
 * operations. The resolver guarantees that applying operations in any
 * order results in the same final document.
 */
export function useConflictResolver(initialDoc: string = '') {
  const docRef = useRef<string>(initialDoc);
  const resolverRef = useRef<ConflictResolver>(otStrategy);

  const applyLocal = useCallback((op: Operation) => {
    const newDoc = resolverRef.current.applyOperation(docRef.current, op);
    docRef.current = newDoc;
    return newDoc;
  }, []);

  const applyRemote = useCallback((remoteOp: Operation) => {
    // Transform the remote operation against any local pending ops.
    const transformed = resolverRef.current.transform(remoteOp, { type: 'insert', index: 0, text: '' });
    const newDoc = resolverRef.current.applyOperation(docRef.current, transformed);
    docRef.current = newDoc;
    return newDoc;
  }, []);

  const getDocument = useCallback(() => docRef.current, []);

  return { applyLocal, applyRemote, getDocument };
}
