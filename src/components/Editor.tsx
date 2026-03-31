{"import React from 'react';
import { useState } from 'react';
import LanguageSelector from './LanguageSelector';

interface Props {
  value: string;
  onChange: (value: string) => void;
  languages: string[];
  selectedLanguage: string;
}

const Editor = ({ value, onChange, languages, selectedLanguage }) => {
  const [formattedValue, setFormattedValue] = useState(value);

  const handleFormat = () => {
    // Format the value based on the selected language
    const formattedValue = formatValue(value, selectedLanguage);
    setFormattedValue(formattedValue);
  };

  return (
    <div>
      <LanguageSelector
        languages={languages}
        selectedLanguage={selectedLanguage}
        onChange={(language) => onChange(language)}
      />
      <textarea value={formattedValue} onChange={(e) => onChange(e.target.value)} />
      <button onClick={handleFormat}>Format</button>
    </div>
  );

  return Editor;
}
export default Editor;