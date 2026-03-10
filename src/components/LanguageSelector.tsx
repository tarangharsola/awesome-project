{"import React from 'react';
import { useState } from 'react';
import { useEditor } from './useEditor';

interface Props {
  language: string;
  onChange: (language: string) => void;
}

const LanguageSelector = ({ language, onChange }: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (newLanguage: string) => {
    onChange(newLanguage);
    setSelectedLanguage(newLanguage);
  };

  return (
    <select value={selectedLanguage} onChange={(event) => handleLanguageChange(event.target.value)}>
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="html">HTML</option>
    </select>
  );
};

export default LanguageSelector;