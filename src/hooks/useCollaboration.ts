import { useState, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import { useCollaborationCore } from './useCollaborationCore';
import { DocumentState, initialDocumentState } from '../types/editor';
import { applyLocalChange } from '../utils/editorHelpers';

export function useCollaboration(userId: string, userName: string, userColor: string) {
  const ws = useWebSocket();
  const [docState, setDocState] = useState<DocumentState>(initialDocumentState);
  const { sendChange } = useCollaborationCore(ws, docState, setDocState, userId, userName, userColor);

  const onLocalEdit = useCallback(
    (change: any) => {
      setDocState(prev => applyLocalChange(prev, change));
      sendChange(change);
    },
    [sendChange]
  );

  return { docState, onLocalEdit, ws };
}
