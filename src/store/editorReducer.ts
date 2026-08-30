import { EditorAction, EditorState } from '../types/editor';
import { resolveConflict, EditOperation } from '../utils/conflictResolver';

const initialState: EditorState = {
  content: '',
  version: 0,
  lastEdit: null as EditOperation | null,
};

export function editorReducer(state = initialState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'LOCAL_EDIT': {
      const newEdit: EditOperation = {
        content: action.payload.content,
        timestamp: Date.now(),
      };
      return {
        ...state,
        content: newEdit.content,
        version: state.version + 1,
        lastEdit: newEdit,
      };
    }
    case 'REMOTE_EDIT': {
      const remoteEdit: EditOperation = {
        content: action.payload.content,
        timestamp: action.payload.timestamp,
      };
      const resolved = resolveConflict(state.lastEdit as EditOperation, remoteEdit);
      return {
        ...state,
        content: resolved.content,
        version: state.version + 1,
        lastEdit: resolved,
      };
    }
    case 'SET_CONTENT': {
      return { ...state, content: action.payload.content };
    }
    default:
      return state;
  }
}
