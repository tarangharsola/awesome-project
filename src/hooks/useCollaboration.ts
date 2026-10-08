import { useCollaborationCore } from "./useCollaborationCore";

export function useCollaboration(roomId: string, username: string) {
  return useCollaborationCore(roomId, username);
}
