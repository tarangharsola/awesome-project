{"import React, { useState, useEffect } from 'react';
import { Editor } from 'slate-react';
import { EditorProps } from 'slate-react';
import { useEditor } from './useEditor';

interface EditorProps extends EditorProps {
  language: string;
}

const EditorComponent: React.FC<EditorProps> = ({ language, ...props }) => {
  const editor = useEditor();

  useEffect(() => {
    editor.commands.toggleBold();
  }, []);

  return (
    <Editor
      {...props}
      value={editor.value}
      onChange={editor.onChange}
      placeholder={editor.placeholder}
      language={language}
    />
  );

  return EditorComponent;
}
export default EditorComponent;