{"import React from 'react';
import { Editor } from 'react-simple-editor';
import useEditor from './useEditor';

const EditorComponent = () => {
  const { text, cursorPosition, setText, setCursorPosition } = useEditor();

  return (
    <Editor
      value={text}
      onChange={(text) => setText(text)}
      cursorPosition={cursorPosition}
      onCursorChange={(cursorPosition) => setCursorPosition(cursorPosition)}
    />
  );
};

export default EditorComponent;