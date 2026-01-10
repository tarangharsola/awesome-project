{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

interface EditorProps {
  editor: useEditor;
}

const Editor = ({ editor }: EditorProps) => {
  const [text, setText] = useState('');
  useEffect(() => {
    const handleChanges = (changes: any[]) => {
      setText(changes.reduce((acc, change) => acc + change.text, ''));
    };
    editor.subscribe(handleChanges);
    return () => editor.unsubscribe(handleChanges);
  }, []);
  return <div>{text}</div>;
};

export default Editor;