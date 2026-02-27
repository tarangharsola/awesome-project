{"import React from 'react';
import { useCodeEditor } from 'react-codemirror-editor';
import { EditorState } from 'codemirror';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, language }) => {
  const { editor } = useCodeEditor({
    value,
    onChange,
    language,
  });
  return editor;
};

export default Editor;