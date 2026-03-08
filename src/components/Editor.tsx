{"import React from 'react';
import { useState, useEffect } from 'react';
import { useLanguage } from './useLanguage';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const Editor = ({ value, onChange, language }: EditorProps) => {
  const [formattedValue, setFormattedValue] = useState(value);
  const { syntaxHighlighting } = useLanguage(language);

  useEffect(() => {
    const formattedValue = syntaxHighlighting(value);
    setFormattedValue(formattedValue);
  }, [value, language]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      onChange(formattedValue + '  ');
    }
  };

  return (
    <div className="editor">
      <pre>{formattedValue}</pre>
      <button onClick={() => onChange(formattedValue + '
')}>Insert New Line</button>
      <button onClick={() => onChange(formattedValue + '  ')}>Indent</button>
    </div>
  );
};

export default Editor;