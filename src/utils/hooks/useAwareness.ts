import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateCursorPosition, setLocalUser } from '../../store/usersReducer';
import { useYjsCollaboration } from '../useConflictResolver';

interface AwarenessProps {
  roomId: string;
  userId: string;
  userName: string;
  userColor: string;
}

export const useAwareness = ({ roomId, userId, userName, userColor }: AwarenessProps) => {
  const dispatch = useDispatch();
  const { updateCursor } = useYjsCollaboration(roomId, userId, userName, userColor);
  const localCursor = useSelector((state: RootState) => state.users.localCursor);

  // Sync local cursor to Yjs awareness whenever it changes
  useEffect(() => {
    if (localCursor) {
      updateCursor({ from: localCursor.from, to: localCursor.to });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localCursor]);

  // Initialize local user info in store
  useEffect(() => {
    dispatch(setLocalUser({ id: userId, name: userName, color: userColor }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for remote awareness updates via Redux (populated by useYjsCollaboration)
  const remoteUsers = useSelector((state: RootState) => state.users.awareness);

  // Dispatch cursor updates for remote users to UI components
  useEffect(() => {
    remoteUsers.forEach((u) => {
      dispatch(updateCursorPosition({ userId: u.id, cursor: u.cursor }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remoteUsers]);
};