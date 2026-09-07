import type { EditorState, EditorAction } from '../types/editor';
import { ConflictResolver } from '../utils/conflictResolver';

// Initialise a resolver per client – clientId is stored in state
export const createEditorReducer = (clientId: string) => {
  const resolver = new ConflictResolver(clientId);
  const initialState: EditorState = {
    content: '',
    appliedOps: new Set<string>(),
    clientId,
  };

  return (state = initialState, action: EditorAction): EditorState => {
    switch (action.type) {
      case 'LOCAL_INSERT': {
        const op = resolver.createOperation('insert', action.index, action.text);
        resolver.queueLocal(op);
        return resolver.applyOperation(state, op);
      }
      case 'LOCAL_DELETE': {
        const op = resolver.createOperation('delete', action.index);
        // Attach length for delete operation
        (op as any).length = action.length;
        resolver.queueLocal(op);
        return resolver.applyOperation(state, op);
      }
      case 'REMOTE_OPERATION': {
        // Remote ops are assumed to already contain a unique id
        return resolver.applyOperation(state, action.operation);
      }
      case 'SET_CONTENT': {
        return { ...state, content: action.content };
      }
      default:
        return state;
    }
  };
};
