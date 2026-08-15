{"import { useState, useEffect } from 'react';
import { useWebSocket } from '../utils/useWebSocket';

interface Room {
  id: string;
}

interface EditorState {
  code: string;
  cursorPositions: CursorPosition[];
}

const useEditor = (roomId: string) => {
  const [editorState, setEditorState] = useState<EditorState>({ code: '', cursorPositions: [] });

  const { receiveCode, sendCode } = useWebSocket(roomId);

  useEffect(() => {
    receiveCode((code) => {
      setEditorState((prevState) => ({ ...prevState, code }));
    });
  }, []);

  const handleCodeChange = (newCode: string) => {
    setEditorState((prevState) => ({ ...prevState, code: newCode }));
    sendCode(newCode);
  };

  return { editorState, handleCodeChange };
};

export default useEditor;