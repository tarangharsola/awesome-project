{"import React, { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editor';
import { useLanguage } from './useLanguage';

interface Props {
  language: string;
  value: string;
  onChange: (value: string) => void;
}

const EditorComponent = ({ language, value, onChange }) => {
  const [formattedValue, setFormattedValue] = useState(value);
  const languageData = useLanguage(language);

  useEffect(() => {
    const formattedValue = languageData.format(value);
    setFormattedValue(formattedValue);
  }, [value, languageData]);

  const handleOnChange = (value: string) => {
    onChange(value);
    setFormattedValue(value);
  };

  return (
    <Editor
      value={formattedValue}
      onChange={handleOnChange}
      language={language}
    />
  );

  return EditorComponent;
}
export default EditorComponent;