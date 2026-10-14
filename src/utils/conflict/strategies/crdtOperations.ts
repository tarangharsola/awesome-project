import { InsertMessage, DeleteMessage } from '../../types/collaborationMessage';
import { DocumentState } from '../../types/collaboration';

export function applyInsert(msg: InsertMessage): DocumentState {
  const { content } = msg as any; // Assuming document content is passed in the message context
  const before = content.slice(0, msg.index);
  const after = content.slice(msg.index);
  return { ...msg, content: before + msg.text + after } as DocumentState;
}

export function applyDelete(msg: DeleteMessage): DocumentState {
  const { content } = msg as any;
  const before = content.slice(0, msg.index);
  const after = content.slice(msg.index + msg.length);
  return { ...msg, content: before + after } as DocumentState;
}
