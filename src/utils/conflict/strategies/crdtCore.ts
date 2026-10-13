import { v4 as uuidv4 } from 'uuid';
import { DocumentState } from '../../../types/editor';
import { ChangeMessage } from '../../types/collaborationMessage';

export function createInitialState(content = ''): DocumentState {
  return { id: uuidv4(), content };
}

export function applyChange(state: DocumentState, msg: ChangeMessage): DocumentState {
  // Simple replace strategy for demonstration; replace with real CRDT merge as needed
  return { ...state, content: msg.change.content };
}
