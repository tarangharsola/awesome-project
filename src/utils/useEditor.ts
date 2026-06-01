{"import { useState, useEffect } from 'react';

interface Props {
  language: string;
  value: string;
}

const useEditor = ({ language, value }) => {
  const [editorValue, setEditorValue] = useState(value);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  return [editorValue, setEditorValue];
};

export default useEditor;