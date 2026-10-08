import { crdtApply, crdtTransform } from "./conflict/strategies/crdt";
import { CollaborationMessage } from "../types/collaboration";

/**
 * Apply a remote edit message to the current document state using CRDT logic.
 */
export function applyRemoteChanges(doc: string, msg: CollaborationMessage): string {
  if (msg.type !== "edit") return doc;
  return crdtApply(doc, msg.payload);
}

/**
 * Convert a local change (delta) into a CollaborationMessage ready for transmission.
 */
export function localChangeToMessage(author: string, delta: string): CollaborationMessage {
  return {
    type: "edit",
    author,
    payload: crdtTransform(delta),
    timestamp: Date.now()
  } as CollaborationMessage;
}
