{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface User {
  id: string;
  name: string;
  color: string;
}

interface AwarenessState {
  users: User[];
  cursorPositions: { [id: string]: { x: number; y: number } };
}

const useAwareness = () => {
  const [awarenessState, setAwarenessState] = useState<AwarenessState>({ users: [], cursorPositions: {} });
  const socket = io();

  useEffect(() => {
    socket.on('users', (users: User[]) => {
      setAwarenessState((prev) => ({ ...prev, users }));
    });
    socket.on('cursorPositions', (cursorPositions: { [id: string]: { x: number; y: number } }) => {
      setAwarenessState((prev) => ({ ...prev, cursorPositions }));
    });
  }, []);

  return awarenessState;
};

export default useAwareness;