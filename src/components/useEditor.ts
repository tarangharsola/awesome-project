{"import { useState, useEffect } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const useEditor = ({ value, onChange, language }: Props) => {
  const [editorValue, setEditorValue] = useState(value);

  useEffect(() => {
    onChange(editorValue);
  }, [editorValue]);

  const handleCodeChange = (newCode: string) => {
    setEditorValue(newCode);
  };

  return {
    value: editorValue,
    onChange: handleCodeChange,
  };
}

export default useEditor;