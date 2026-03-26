{"import React, { useState, useEffect } from 'react';
import { Editor } from 'slate-react';
import { EditorProps } from 'slate-react';
import { useEditor } from './useEditor';

interface EditorProps extends EditorProps {
  language: string;
}

const EditorComponent: React.FC<EditorProps> = ({ language, ...props }) => {
  const editor = useEditor(props);

  useEffect(() => {
    const handleFormat = () => {
      editor.commands.toggleBlock('code');
    };

    editor.commands.addCommand('format', handleFormat);
  }, [editor]);

  return (
    <Editor
      {...props}
      className={language === 'javascript' ? 'language-javascript' : language === 'python' ? 'language-python' : 'language-html'}
    />
  );

  return EditorComponent;
}
export default EditorComponent;