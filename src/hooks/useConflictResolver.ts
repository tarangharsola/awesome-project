import { useRef, useCallback } from "react";
import { DocumentChange } from "../types/editor";
import { applyChange, transformChange } from "../utils/conflictResolver";

/**
 * Hook that manages local and remote document changes using the lightweight
 * operational‑transformation utilities defined in `conflictResolver.ts`.
 * It keeps the current content in a ref and exposes helpers for applying
 * local edits (e.g., from the editor) and remote edits (e.g., from other users).
 */
export function useConflictResolver(initialContent: string) {
  const contentRef = useRef<string>(initialContent);
  const pendingRef = useRef<DocumentChange[]>([]);

  const applyRemote = useCallback((remoteChange: DocumentChange) => {
    // Transform any pending local changes against the incoming remote change.
    const pending = pendingRef.current;
    for (let i = 0; i < pending.length; i++) {
      pending[i] = transformChange(pending[i], remoteChange);
    }
    // Apply the remote change to the canonical content.
    contentRef.current = applyChange(contentRef.current, remoteChange);
  }, []);

  const applyLocal = useCallback((localChange: DocumentChange) => {
    // Queue the local change so it can be transformed against future remote edits.
    pendingRef.current.push(localChange);
    // Optimistically apply it to the local view.
    contentRef.current = applyChange(contentRef.current, localChange);
    return localChange;
  }, []);

  const getContent = useCallback(() => contentRef.current, []);

  return {
    getContent,
    applyLocal,
    applyRemote,
    pendingChanges: pendingRef.current
  } as const;
}
