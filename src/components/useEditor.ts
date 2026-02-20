{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { OperationalTransformation } from 'ot-js';

interface EditorState {
  document: string;
  cursorPositions: { [id: string]: { x: number; y: number } };
  conflicts: { [id: string]: string };
}

const useEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>({ document: '', cursorPositions: {}, conflicts: {} });
  const socket = io();
  const ot = new OperationalTransformation();

  useEffect(() => {
    socket.on('users', (users: { id: string; name: string; color: string }[]) => {
      setEditorState((prev) => ({ ...prev, cursorPositions: {} }));
    });
    socket.on('cursorPositions', (cursorPositions: { [id: string]: { x: number; y: number } }) => {
      setEditorState((prev) => ({ ...prev, cursorPositions }));
    });
    ot.on('conflict', (id: string, conflict: string) => {
      setEditorState((prev) => ({ ...prev, conflicts: { ...prev.conflicts, [id]: conflict } }));
    });
  }, []);

  return editorState;
};

export default useEditor;