import { useCollaborationCore } from './useCollaborationCore';
import { useCollaborationUI } from './useCollaborationUI';

/**
 * Combined collaboration hook that merges core networking/CRDT logic with UI state handling.
 * Returns a unified API for components.
 */
export const useCollaboration = (docId: string, username: string) => {
  const core = useCollaborationCore(docId, username);
  const ui = useCollaborationUI(docId, username);

  // Core provides low‑level functions (sendMessage, connectionStatus, etc.)
  // UI provides higher‑level state (users list). Merge them for consumer convenience.
  return { ...core, ...ui };
};
