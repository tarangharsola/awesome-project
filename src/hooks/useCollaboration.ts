import { useReducer } from 'react';
import { collaborationReducer, initialCollaborationState } from '../store/editorReducer';
import { useCollaborationCore } from './useCollaborationCore';
import { useCollaborationUI } from './useCollaborationUI';
import { CollaborationAction } from '../types/collaboration';

export function useCollaboration(docId: string) {
  const [state, dispatch] = useReducer(collaborationReducer, initialCollaborationState);
  const { sendLocalInsert, sendLocalDelete, handleRemoteMessage } = useCollaborationCore(
    docId,
    state.document,
    dispatch
  );

  useCollaborationUI(dispatch, state.presence);

  return {
    state,
    sendLocalInsert,
    sendLocalDelete,
    handleRemoteMessage,
  };
}
