import { CollaborationMessage, CollaborationMessageType } from "../types/collaborationMessage";
import { applyCRDTOperation } from "../utils/conflict/strategies/crdt";

/**
 * Centralized handler for collaboration messages. Keeps the hook lightweight
 * and isolates transformation logic.
 */
export function handleCollaborationMessage(
  msg: CollaborationMessage,
  applyRemote: (op: any) => void
): void {
  if (msg.type === CollaborationMessageType.OPERATION) {
    const { operation } = msg.payload as { operation: any };
    const transformed = applyCRDTOperation(operation);
    applyRemote(transformed);
  } else if (msg.type === CollaborationMessageType.CURSOR) {
    // Cursor handling is delegated to UI components; we simply forward the payload.
    applyRemote(msg.payload);
  }
}
