{"import React from 'react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../utils/useLanguage';
import { useEditor } from '../utils/useEditor';

interface Props {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const Editor = ({ value, onChange, language }: Props) => {
  const [localValue, setLocalValue] = useState(value);
  const { syntaxHighlighting } = useLanguage(language);
  const { handleKeyDown } = useEditor(onChange);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleLanguageChange = (newLanguage: string) => {
    onChange(syntaxHighlighting(localValue, newLanguage));
  };

  return (
    <div className="editor">
      <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <textarea value={localValue} onChange={(e) => setLocalValue(e.target.value)} onKeyDown={handleKeyDown} />
    </div>
  );
};

export default Editor;