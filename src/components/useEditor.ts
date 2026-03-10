{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';

interface Props {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const useEditor = ({ value, onChange, language }: Props) => {
  const [editorValue, setEditorValue] = useState(value);
  const [formattedValue, setFormattedValue] = useState(value);
  const [languageValue, setLanguageValue] = useState(language);

  useEffect(() => {
    onChange(editorValue);
  }, [editorValue]);

  const handleLanguageChange = (language: string) => {
    setLanguageValue(language);
    // Update formatting based on language
  };

  const handleFormat = () => {
    // Format the editor value based on the selected language
    setFormattedValue(editorValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
    if (event.key === 'Ctrl+S') {
      onChange(editorValue);
    }
  };

  return {
    value: editorValue,
    onChange: (newValue: string) => setEditorValue(newValue),
    language: languageValue,
    handleLanguageChange,
    handleFormat,
    handleKeyDown,
  };
};

export default useEditor;