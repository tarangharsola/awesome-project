{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface EditorProps {
  users: { id: string; name: string; color: string }[]
}

const useEditor = ({ users }) => {
  const [editorState, setEditorState] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setEditorState(editorState + 'Hello World!');
    }, 1000);
    return () => clearInterval(intervalId);
  }, [editorState]);

  return editorState;
}

export default useEditor;