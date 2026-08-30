import { useRef, useCallback } from 'react'
import { ConflictResolver } from '../utils/conflictResolver'
import { TextOperation } from '../types/conflict'

/**
 * Hook that provides a ConflictResolver instance bound to the component lifecycle.
 * It returns helpers to apply local and remote operations while keeping pending
 * local operations in a stable reference.
 */
export function useConflictResolver(initialDoc: string) {
  const resolverRef = useRef(new ConflictResolver(initialDoc))
  const pendingOpsRef = useRef<TextOperation[]>([])

  const applyLocal = useCallback((op: TextOperation) => {
    pendingOpsRef.current.push(op)
    const newDoc = resolverRef.current.applyLocal(op)
    return newDoc
  }, [])

  const applyRemote = useCallback((op: TextOperation) => {
    const newDoc = resolverRef.current.applyRemote(op, pendingOpsRef.current)
    // After a remote op is integrated we can clear ops that have been transformed.
    pendingOpsRef.current = []
    return newDoc
  }, [])

  const getDocument = useCallback(() => resolverRef.current.getDocument(), [])

  return { applyLocal, applyRemote, getDocument }
}
