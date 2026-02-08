{"import { useState, useEffect } from 'react';

interface Props {
  initialValue: string;
  onChange: (value: string) => void;
  language: string;
}

const useEditor = ({ initialValue, onChange, language }: Props) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    onChange(value);
  }, [value]);

  const handleEditorChange = (newValue: string) => {
    setValue(newValue);
  };

  return {
    value,
    onChange: handleEditorChange,
    language
  };
};

export default useEditor;