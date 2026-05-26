{"import { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editor';

const useEditor = () => {
  const [text, setText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    const socket = useWebSocket().socket;
    socket.on('update', (data) => {
      setText(data.text);
      setCursorPosition(data.cursorPosition);
    });
  }, [socket, setText, setCursorPosition]);

  return { text, cursorPosition, setText, setCursorPosition };
};

export default useEditor;