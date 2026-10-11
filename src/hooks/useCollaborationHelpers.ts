import { CollaborationMessage } from '../types/collaborationMessage';
import { editorStore } from '../store/editorReducer'; // Adjust import according to actual store implementation

export function applyRemoteChanges(msg: CollaborationMessage) {
  if (msg.type === 'edit') {
    // Simple example: replace editor content; real implementation should merge via CRDT/OT
    editorStore.setContent(msg.content);
  }
}

export function generateLocalChange(content: string, cursorPos: number, userId: string): CollaborationMessage {
  return {
    type: 'edit',
    userId,
    content,
    cursorPos,
    timestamp: Date.now()
  };
}
